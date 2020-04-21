// Info for the analysis of user input symptoms

// As of 2020 census data 
// SOURCE: https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901
const POPULATION_PROVINCE = {
    'ON': 14711827,
    'QC': 8537674,
    'BC': 5110917,
    'AB': 4413146,
    'MB': 1377517,
    'SK': 1181666,
    'NS': 977457,
    'NB': 779993,
    'NL': 521365,
    'PE': 158158,
    'NT': 44904,
    'YK': 41078,
    'NU': 39097
};

/**
 * Returns the percent chance that a patient demonstrating Flu-like symptoms may 
 * have COVID based on geographical location and the current amount of cases in their region
 * @param {String} province - Eg. 'BC'
 */
function getPercentageCovidChanceLocation(province, casesInProvince){

    // get the population of the selected province
    const POPULATION = POPULATION_PROVINCE[province];

    // Percentage of the US population that has the flu on an average year, assuming Canadian proportion is the same
    // SOURCE: https://www.cdc.gov/flu/about/burden/preliminary-in-season-estimates.htm
    const PERCENT_POPULATION_FLU_PER_YEAR = .15;
    
    // Flu season lasts on average from october to may: ~6 months
    // 6 * 30 = 180
    const DAYS_PER_FLU_SEASON = 6 * 30;  // days of flu season
    
    // Flu symptoms last an average of 5-7 days, so we get about 30 Flu cycles in a season.
    // 180 / 30 = 6s
    const FLU_CYCLES_PER_SEASON = DAYS_PER_FLU_SEASON / 6;
    
    // Dividing the percent of the population that will have the flu on in a year by the number of cycles
    // gives us the approximate percentage of the population that has the flu at any average day during
    // Flu season.  This calculation assumes even distribution across Flu season which is not reflected in real life,
    // with December/January having the peak.
    const PERCENT_POPULATION_WITH_FLU_PER_DAY = PERCENT_POPULATION_FLU_PER_YEAR / FLU_CYCLES_PER_SEASON;  // = 0.005 or 0.5%

    // Calculates the average people in the province with the flu on any average day
    const POPULATION_WITH_FLU_PER_DAY = POPULATION * PERCENT_POPULATION_WITH_FLU_PER_DAY;

    // Calculates the percentage of COVID cases to estimated Flu cases
    // BC = ~6%
    const PERCENTAGE_CHANCE_COVID = casesInProvince / POPULATION_WITH_FLU_PER_DAY;

    return PERCENTAGE_CHANCE_COVID;
}

/**
 * returns the ratio of the frequency of more COVID distinct symptoms vs. Flu symptoms.
 * Depends on which symptoms the user selects on the symptoms page
 */
function getCovidSymptomFreqDiff(symptomsArray) {

    // SOURCE: http://www.bccdc.ca/health-info/diseases-conditions/covid-19/data
    const COVID_RATES = {

        'Diarrhea': 26.7,
        'Nasal Congestion': 16.1,
        'Nausea': 24.4,

        'Chills': 85.0,
        'Headache': 16.1,
        'Sore Throat': 17.8,
        'Aches and Pains': 34.4,

        'Shortness of Breath': 80.0,

        'Cough': 86.1,
        'Fatigue': 6.1,
    
        'Fever': 85.0,

        //extreme
        'Severe Chest Pain': 90,
        'Severe Difficulty Breathing': 90,
        'Difficulty Waking Up': 90,
        'Feeling Confused': 90

    };

    // SOURCE: https://www.cdc.gov/flu/symptoms/symptoms.htm
    // Estimated percentages based on equivalence classes of 15%
    const FLU_RATES = {

        'Diarrhea': 15.0,
        'Nausea': 15.0,
        'Shortness of Breath': 15.0,

        'Nasal Congestion': 30.0,
        'Sore Throat': 30.0,
    
        'Headache': 50.0,
        'Cough': 50.0,

        'Chills': 75.0,

        'Fatigue': 90.0,
        'Fever': 90.0,
        'Aches and Pains': 90.0,

        //estimate, heavily weighted towards COVID as these are characteristic symptoms of the disease
        'Severe Chest Pain': 10,
        'Severe Difficulty Breathing': 10,
        'Difficulty Waking Up': 10,
        'Feeling Confused': 10
        
    };

    // Sum up the symptom frequencies
    var sumCov = 0;
    var sumFlu = 0;
    symptomsArray.forEach(element => {

        sumCov += COVID_RATES[element];
        sumFlu += FLU_RATES[element];

    });

    // Now we compare totals for Flu and COVID
    const TOTAL_COVID = sumCov / 100;
    const TOTAL_FLU = sumFlu / 100;

    // Difference of totals divided by sum of totals
    const DIFF = (TOTAL_COVID - TOTAL_FLU / (TOTAL_FLU + TOTAL_COVID));

    return DIFF;
}

/**
 * Gets the percentage chance that the user has COVID vs. Flu based on their symptoms and geographical location
 * @param {String} province - Eg. 'BC'
 * @param {Int} casesInProvince - Estimated number of COVID cases in province
 * @param {String[]} symptomsArray - array of symptoms from the user
 */
export function getFinalCovidPercentChance(province, casesInProvince, symptomsArray, averageInteractions) {
    
    const INTERACTION_MODIFIER = (25*averageInteractions)/(averageInteractions + 25);

    if(symptomsArray.length == 0) {
        return (casesInProvince / POPULATION_PROVINCE[province] * 100) + INTERACTION_MODIFIER;
    }

    const PERCENTAGE_CHANCE_COVID_BY_LOCATION = getPercentageCovidChanceLocation(province, casesInProvince);
    
    const COVID_SYMPTOM_FREQ_DIFF = getCovidSymptomFreqDiff(symptomsArray); //multiplier


    // Formula 1/(1 + e^{-.25x}), value will approach 1 and each symptom makes it more likely, but never passing 1
    const FINAL_ANSWER = PERCENTAGE_CHANCE_COVID_BY_LOCATION / (PERCENTAGE_CHANCE_COVID_BY_LOCATION + Math.pow(Math.E, ( -.25 * (COVID_SYMPTOM_FREQ_DIFF + Math.sqrt(INTERACTION_MODIFIER)))));

    return FINAL_ANSWER * 100;
}
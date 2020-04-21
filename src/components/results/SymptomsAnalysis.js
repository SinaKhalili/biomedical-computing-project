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

var symptomsArray = ['Aches and Pains', 'Fever', 'Dry Cough'];

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
function getCovidChanceSymptomsMultiplier() {

    // if no symptoms selected, return .01


    // Table of frequency values
    // Extreme symptoms are more heavily weighted since they are significantly more indicative of COVID over the Flu
    const freq = {
        RARELY: 1,
        SOMETIMES: 2,
        COMMON: 3,
        FAIRLY_COMMON: 4,
        USUAL: 5,
        EXTREME: 15
    };

    // SOURCE: http://www.bccdc.ca/health-info/diseases-conditions/covid-19/data
    const COVID_RATES = {

        'Diarrhea': freq.RARELY,
        'Nasal Congestion': freq.RARELY,
        'Nausea': freq.RARELY,

        'Chills': freq.SOMETIMES,
        'Headache': freq.SOMETIMES,
        'Sore Throat': freq.SOMETIMES,
        'Aches and Pains': freq.SOMETIMES,

        'Shortness of Breath': freq.COMMON,

        'Wet Cough': freq.FAIRLY_COMMON,
        'Fatigue': freq.FAIRLY_COMMON,
    
        'Dry Cough': freq.USUAL,
        'Fever': freq.USUAL,

        //extreme
        'Severe Chest Pain': freq.EXTREME,
        'Severe Difficulty Breathing': freq.EXTREME,
        'Difficulty Waking Up': freq.EXTREME,
        'Feeling Confused': freq.EXTREME

    };

    // SOURCE: https://www.cdc.gov/flu/symptoms/symptoms.htm
    const FLU_RATES = {

        'Diarrhea': freq.RARELY,
        'Nausea': freq.RARELY,

        'Nasal Congestion': freq.SOMETIMES,
        'Sore Throat': freq.SOMETIMES,
    
        'Headache': freq.COMMON,
        'Dry Cough': freq.COMMON,
        'Wet Cough': freq.COMMON,

        'Chills': freq.FAIRLY_COMMON,

        'Fatigue': freq.USUAL,
        'Fever': freq.USUAL,
        'Aches and Pains': freq.USUAL,

        //extreme, not symptoms in Flu
        'Severe Chest Pain': 1,
        'Severe Difficulty Breathing': 1,
        'Difficulty Waking Up': 1,
        'Feeling Confused': 1
        
    };

    // Sum up the symptom frequencies
    var sumCov = 0;
    var sumFlu = 0;
    symptomsArray.forEach(element => {

        sumCov += COVID_RATES[element];
        sumFlu += FLU_RATES[element];

    });

    // Now we compare totals for Flu and COVID
    const TOTAL_COVID = sumCov;
    const TOTAL_FLU = sumFlu;

    // Final total ratio of COVID symptom totals over Flu symptom totals
    const TOTAL_RATIO = TOTAL_COVID / TOTAL_FLU;

    return TOTAL_RATIO;
}

/**
 * Gets the percentage chance that the user has COVID vs. Flu based on their symptoms and geographical location
 * @param {String} province - Eg. 'BC'
 * @param {Int} casesInProvince - Estimated number of COVID cases in province
 * @param {String[]} symptomsArray - array of symptoms from the user
 */
function getFinalCovidPercentChance(province, casesInProvince, symptomsArray) {

    if(symptomsArray.length == 0) {
        return casesInProvince / POPULATION_PROVINCE[province];
    }

    const PERCENTAGE_CHANCE_COVID_BY_LOCATION = getPercentageCovidChanceLocation(province, casesInProvince);

    const COVID_SYMPTOMS_TO_FLU_MULTIPLIER = getCovidChanceSymptomsMultiplier(symptomsArray); //multiplier

    console.log(symptomsArray);
    console.log('location: ' + PERCENTAGE_CHANCE_COVID_BY_LOCATION);
    console.log('symptoms: ' + COVID_SYMPTOMS_TO_FLU_MULTIPLIER);

    // Two independent events so use multiplicity theory to get the final percentage likelihood of COVID
    const FINAL_ANSWER = (PERCENTAGE_CHANCE_COVID_BY_LOCATION * COVID_SYMPTOMS_TO_FLU_MULTIPLIER) * 100; //percent

    return FINAL_ANSWER;
}

console.log(getFinalCovidPercentChance('BC', 1400, symptomsArray));
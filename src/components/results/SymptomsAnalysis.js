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

const COVID_CASES = {
    'BC': 1600
};


function getPercentageCovidChanceLocation(province){

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
    // gives us the approximate percentage of the population that has the flu at any given point in time during
    // Flu season.  This calculation assumes even distribution across Flu season which is not reflected in real life,
    // with December/January having the peak.
    const PERCENT_POPULATION_WITH_FLU_PER_DAY = PERCENT_POPULATION_FLU_PER_YEAR / FLU_CYCLES_PER_SEASON;  // = 0.005 or 0.5%

    // Calculates the average people in the province with the flu on any average day
    const POPULATION_WITH_FLU_PER_DAY = POPULATION * PERCENT_POPULATION_WITH_FLU_PER_DAY;

    // Calculates the percentage of COVID cases to estimated Flu cases
    // BC = ~6%
    const PERCENTAGE_CHANCE_COVID = COVID_CASES[province] / POPULATION_WITH_FLU_PER_DAY;

    return PERCENTAGE_CHANCE_COVID;

}


function getPercentageCovidChanceSymptoms(){

    // Table of frequency values
    // Extreme symptoms are more heavily weighted since they are significantly more indicative of COVID over the Flu
    const freq = {
        RARELY: 1,
        SOMETIMES: 2,
        COMMON: 3,
        FAIRLY_COMMON: 4,
        USUAL: 5,
        EXTREME: 25
    };

    // reflects the percentage of diagnosed COVID cases that
    // SOURCE: 
    const COVID_RATES = {

        'diarrhea': freq.RARELY,
        'nasal congestion': freq.RARELY,
        'nausea': freq.RARELY,

        'chills': freq.SOMETIMES,
        'headache': freq.SOMETIMES,
        'sore throat': freq.SOMETIMES,
        'aches': freq.SOMETIMES,

        'shortness of breath': freq.COMMON,

        'wet cough': freq.FAIRLY_COMMON,
        'fatigue': freq.FAIRLY_COMMON,
    
        'dry cough': freq.USUAL,
        'fever': freq.USUAL,

        //extreme
        'severe chest pain': freq.EXTREME,
        'severe difficulty breathing': freq.EXTREME,
        'difficulty waking up': freq.EXTREME,
        'feeling confused': freq.EXTREME

    };

    const FLU_RATES = {

        'diarrhea': freq.RARELY,
        'nausea': freq.RARELY,

        'nasal congestion': freq.SOMETIMES,
        'sore throat': freq.SOMETIMES,
    
        'headache': freq.COMMON,
        'dry cough': freq.COMMON,
        'wet cough': freq.COMMON,

        'chills': freq.FAIRLY_COMMON,

        'fatigue': freq.USUAL,
        'fever': freq.USUAL,
        'aches': freq.USUAL,

        //extreme, not symptoms in Flu
        'severe chest pain': 0,
        'severe difficulty breathing': 0,
        'difficulty waking up': 0,
        'feeling confused': 0
        
    };

    var symptomsGroup = ['aches'];

    // Sum up the symptom frequencies
    var sumCov = 0;
    var sumFlu = 0;
    symptomsGroup.forEach(element => {

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


function getFinalCovidPercentChance(province){

    const PERCENTAGE_CHANCE_COVID_BY_LOCATION = getPercentageCovidChanceLocation(province);

    const RATIO_COVID_SYMPTOMS_TO_FLU = getPercentageCovidChanceSymptoms();

    // Two independent events so use multiplicity theory to get the final percentage likelihood of COVID
    const FINAL_ANSWER = (PERCENTAGE_CHANCE_COVID_BY_LOCATION * RATIO_COVID_SYMPTOMS_TO_FLU) * 100; //percent

    return FINAL_ANSWER;
}

console.log(getFinalCovidPercentChance('BC'));
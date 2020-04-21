// Info for the analysis of user input symptoms

// Get this from risk factors
var province = 'BC';

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
}

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


/* 
    The rest of the algorithm uses this base rate to calculate how much more likely your symptoms are to be 
    COVID instead of the Flu
*/


// reflects the percentage of diagnosed COVID cases that
const COVID_RATES = {
        'rarely':
        {
            'diarrhea': .04,
            'nasal congestion': .05,
            'nausea': .05

        },
        'sometimes': 
        {   
            'chills': .14,
            'headache': .14,
            'sore throat': .14,
            'aches': .15
        },
        'common': 
        {
            'shortness of breath': .19

        },
        'fairly common': 
        {
            'wet cough': .33,
            'fatigue': .38
        },
        'usual': 
        {
            'dry cough': .68,
            'fever': .88
        }
};

const FLU_RATES = {
    'rarely':
    {
        'diarrhea': 1,
        'nausea': 1

    },
    'sometimes': 
    {   
        'nasal congestion': 1,
        'sore throat': .14
    },
    'common': 
    {
        'headache': .14,
        'dry cough': .33,
        'wet cough': .60

    },
    'fairly common': 
    {
        'chills': .6
    },
    'usual': 
    {
        'fatigue': .68,
        'fever': .80,
        'aches': .80
    }
};

const SEVERE_CHEST_PAIN = 0;
const SEVERE_DIFFICULTY_BREATHING = 0;
const DIFFICULTY_WAKING_UP = 0;
const FEELING_CONFUSED = 0;

// how much does it increase your chance if you have severe symptoms?


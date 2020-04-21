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

// reflects the percentage of diagnosed COVID cases that
const FEVER_RATE = .88;
const DRY_COUGH_RATE = .68;
const FATIGUE_RATE = .38;
const WET_COUGH_RATE = .33;
const SHORTNESS_OF_BREATH_RATE = .19;
const ACHES_RATE = 15;
const SORE_THROAT_RATE = .14;
const HEADACHE_RATE = .14;
const CHILLS_RATE = .14;
const NAUSEA_RATE = .05;
const NASAL_CONGESTION_RATE = .05;
const DIARRHEA_RATE = .04;

// how much does it increase your chance if you have severe symptoms?


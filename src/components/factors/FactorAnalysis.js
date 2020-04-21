export function getConditionPercent(conditions) {
    let MULTIPLE = 37.6;
    let DIATBETES = 10.9;
    let LUNG_DISEASE = 9.2;
    let CVD = 9.0;
    let IMMUNOCOMPROMISED = 3.7;
    let RENAL = 3.0;
    let PREGNANT = 2.0;
    let NEURLOGIC = 0.7;
    let LIVER = 0.6;
    let CHRONIC = 16.5;
    let FORMER_SMOKER = 2.3;
    let CURRENT_SMOKER = 1.3;

    if (conditions.length > 1) {
        return MULTIPLE;
    } else if (conditions.includes("Diabetes Mellitus")) {
        return DIATBETES;
    } else if (conditions.includes("Chronic Lung Disease")) {
        return LUNG_DISEASE;
    } else if (conditions.includes("Cardiovascular Disease")) {
        return CVD;
    } else if (conditions.includes("Immunocompromised")) {
        return IMMUNOCOMPROMISED;
    } else if (conditions.includes("Chronic Renal Disease")) {
        return RENAL;
    } else if (conditions.includes("Pregnant")) {
        return PREGNANT;
    } else if (conditions.includes("Neurologic Disorder")) {
        return NEURLOGIC;
    } else if (conditions.includes("Chronic Liver Disease")) {
        return LIVER;
    } else if (conditions.includes("Other Chronic Disease")) {
        return CHRONIC;
    } else if (conditions.includes("Former Smoker")) {
        return FORMER_SMOKER;
    } else if (conditions.includes("Current Smoker")) {
        return CURRENT_SMOKER;
    } else {
        return 0;
    }
}

export function getAgeSeverityPercent(age) {
    if (age < 20) {
        return 1.6;
    } else if (age < 45) {
        return 14.3;
    } else if (age < 55) {
        return 21.2;
    } else if (age < 65) {
        return 20.5;
    } else if (age < 75) {
        return 28.6;
    } else if (age < 85) {
        return 30.5;
    } else {
        return 31.5;
    }
}
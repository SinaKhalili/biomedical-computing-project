<!-- src/components/RisksScreen.vue -->

<template>
    <div>
        <h1>External Factors Screen</h1>
        <el-form>
            <el-form-item>
                <h5 >Age</h5>
                <div class="item">
                    <el-input-number v-model="age" controls-position="right" :min="0"></el-input-number>
                </div>
                <h5>Province</h5>
                <div class="item">
                    <el-select v-model="chosenProvince" placeholder="British Columbia">
                        <el-option
                            v-for="province in provinces"
                            :key="province.value"
                            :label="province.label"
                            :value="province.value">
                        </el-option>
                    </el-select>
                </div>
                <h5>Number of Different People You've had Extended Interactions with in the Last 2 Week</h5>
                <div class="item">
                    <el-input-number v-model="averageInteractions" controls-position="right" :min="0"></el-input-number>
                </div>
                <div id="table-container">
                    <table>
                        <el-checkbox-group v-model="conditions">
                            <tr>
                                <th><el-checkbox class="check" border label="Diabetes Mellitus"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Chronic Lung Disease"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Cardiovascular Disease"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Immunocompromised"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Chronic Renal Disease"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Chronic Liver Disease"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Pregnant"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Neurologic Disorder"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Former Smoker"></el-checkbox></th>
                                <th><el-checkbox class="check" border label="Current Smoker"></el-checkbox></th>
                            </tr>
                            <tr>
                                <th><el-checkbox class="check" border label="Other Chronic Disease"></el-checkbox></th>
                            </tr>
                        </el-checkbox-group>
                    </table>
                </div>
            </el-form-item>
        </el-form>
            <el-button type="secondary" id="back-button" v-on:click="$emit('back')">Back</el-button>
            <el-button type="primary" id="next-button" v-on:click="nextPage">Next</el-button>
    </div>
</template>

<script>
import {getConditionPercent, getAgeSeverityPercent} from './FactorAnalysis.js';

export default {
    name: 'factors',
    data () {
        return {
            age: 0,
            chosenProvince: 'BC',
            averageInteractions: 0,
            conditions: [],
            provinces: [
                {
                    value: 'BC',
                    label: 'British Columbia',
                },
                {
                    value: 'AB',
                    label: 'Alberta',
                },
                {
                    value: 'SK',
                    label: 'Saskatchewan',
                },
                {
                    value: 'MB',
                    label: 'Manitoba',
                },
                {
                    value: 'ON',
                    label: 'Ontario',
                },
                {
                    value: 'QC',
                    label: 'Quebec',
                },
                {
                    value: 'NL',
                    label: 'Newfoundland and Labrador',
                },
                {
                    value: 'NB',
                    label: 'New Brunswick',
                },
                {
                    value: 'PEI',
                    label: 'Prince Edward Island',
                },
                {
                    value: 'NS',
                    label: 'Nova Scotia',
                },
                {
                    value: 'YK',
                    label: 'Yukon',
                },
                {
                    value: 'NT',
                    label: 'Northwest Territories',
                },
                {
                    value: 'NU',
                    label: 'Nunavut',
                },
            ]
        }
    },
    methods: {
        nextPage() {
            const shit = {
                province: this.chosenProvince,
                averageInteractions: this.averageInteractions,
                ageSeverityPercent: getAgeSeverityPercent(this.age),
                conditionPercent: getConditionPercent(this.conditions),
            }
            this.$emit('next', shit)
        }
    }
}
</script>

<style scoped>
.item {
    margin-bottom: 1.67em;
}

.center {
    text-align: center;
}

#table-container {
    width: 100%;
    display: block;
    text-align: center;
}

table {
    display: inline-block;
}

th {
    text-align: left;
    width: 250px;
}

.check {
    width: 200px;
    margin: 5px;
}
h5 {
    margin: 0;
}
</style>
<template>
  <v-layout column>
    <span>
      <div class="headline text-xs-left">
        Your Goals
        <v-btn
          round
          outline
          class="add-goal"
          @click.stop="toggleDialog"
          color="grey darken-2"
        >
          + Add a Goal
        </v-btn>
      </div>
    </span>
      <v-card style="min-width: 800px; min-height: 200px;" v-if="goals.length < 1">
        <v-card-text>
          <p class="goal-title">Create a goal to get started.</p>
        </v-card-text>
      </v-card>
        <v-container>
            <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="600px" class="dialogForm" ref="dialog">
                <v-btn
                  slot="activator"
                  color="secondary"
                  @click.native="toggleDialog"
                  round
                  v-if="goals.length < 1"
                  style="margin-top: -200px;"
                >
                  + Add a Goal
                </v-btn>

                <v-stepper v-model="step">
                  <v-stepper-header>
                    <v-btn
                      fab
                      flat
                      medium
                      @click.native="prevStep"
                      v-if="step > 1"
                    >
                      <div class="text-xs-center">
                        <v-icon>keyboard_arrow_left</v-icon>
                      </div>
                    </v-btn>
                    <v-btn
                    fab
                    flat
                    small
                    v-else
                    disabled
                    >
                    </v-btn>
                    <v-spacer></v-spacer>
                    <span class="form-title">
                      <span class="text-xs-center" v-if="step == 1">WHERE DO YOU WANT TO GO?</span>
                      <span class="text-xs-center" v-if="step == 2">HOW MUCH DO YOU NEED?</span>
                      <span class="text-xs-center" v-if="step == 3">LET'S MAKE IT HAPPEN</span>
                      <span class="text-xs-center" v-if="step == 4">CONGRATS, YOUR GOAL HAS BEEN SAVED!</span>
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn fab flat small @click.native="toggleDialog">
                      <div class="text-xs-center">
                        <v-icon light>clear</v-icon>
                      </div>
                    </v-btn>
                  </v-stepper-header>
                  <v-divider></v-divider>
                  <v-progress-linear
                    v-model="valueDeterminate"
                    background-color="white"
                    v-if="step <= 3"
                    :gradient="gradient"
                  >
                  </v-progress-linear>
                  <v-stepper-items>
                      <v-stepper-content step="1" ref="stepOne">
                        <v-container fluid grid-list-xs>
                          <v-form ref="form1" v-model="stepOneValid">
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2>
                                <v-text-field
                                  v-model="goal.name"
                                  :rules="[v => !!v || 'Goal name is required']"
                                  label="Goal Name"
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2>
                                <v-text-field
                                  v-model="goal.destination"
                                  :rules="[v => !!v || 'A destination is required']"
                                  label="Destination"
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2>
                                <v-select
                                  v-model="goal.type"
                                  :items="types"
                                  :rules="[v => !!v || 'Type of travel is required']"
                                  label="Type of Travel"
                                  required
                                ></v-select>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2>
                                <v-text-field
                                  v-model.number="goal.lengthTime"
                                  :rules="[v => !!v || 'A trip length is required']"
                                  label="Length of Trip"
                                  required
                                  suffix="days"
                                  mask="###"
                                  dont-fill-mask-blanks
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex class="text-xs-center">
                                <v-btn
                                  color="secondary"
                                  @click.native="nextStep"
                                  round
                                  class="next"
                                  :disabled="!stepOneValid"
                                >
                                  Next Step
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </v-stepper-content>

                      <v-stepper-content step="2">
                        <v-container fluid grid-list-xs>
                          <v-form ref="form2" v-model="stepTwoValid">
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Flights</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs3 offset-xs2>
                                <v-text-field
                                  name="flightPrice"
                                  v-model.number="goal.flightPrice"
                                  prefix="$"
                                  placeholder="0"
                                  :rules="[v => !!v || 'A flight price is required']"
                                  hint="Use '00' if not applicable"
                                  single-line
                                  mask="#######"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">close</v-icon>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-text-field
                                  v-model.number="goal.flightQuantity"
                                  min=0
                                  single-line
                                  type="number"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <span class="describer primary--text"><strong>people</strong></span>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">mdi-equal</v-icon>
                              </v-flex>
                              <v-flex xs1 class="total text-xs-center">
                                ${{ flightTotal }}
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Accomodation</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs3 offset-xs2>
                                <v-text-field
                                  name="accomodationPrice"
                                  v-model.number="goal.accomodationPrice"
                                  :rules="[v => !!v || 'An accomodation price is required']"
                                  hint="Use '00' if not applicable"
                                  prefix="$"
                                  placeholder="0"
                                  single-line
                                  mask="#######"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">close</v-icon>
                              </v-flex>
                              <v-flex xs1>
                                <v-text-field
                                  v-model.number="goal.accomodationQuantity"
                                  single-line
                                  type="number"
                                  min=0
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <span class="describer primary--text"><strong>days</strong></span>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">mdi-equal</v-icon>
                              </v-flex>
                              <v-flex xs1 class="total text-xs-center">
                                ${{ accomodationTotal }}
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Car Rental</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs3 offset-xs2>
                                <v-text-field
                                  name="carRentalPrice"
                                  v-model.number="goal.carRentalPrice"
                                  :rules="[v => !!v || 'A car rental price is required']"
                                  hint="Use '00' if not applicable"
                                  prefix="$"
                                  placeholder="0"
                                  single-line
                                  mask="#######"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">close</v-icon>
                              </v-flex>
                              <v-flex xs1>
                                <v-text-field
                                  name="carRentalQuantity"
                                  v-model.number="goal.carRentalQuantity"
                                  single-line
                                  min=0
                                  type="number"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <span class="describer primary--text"><strong>days</strong></span>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">mdi-equal</v-icon>
                              </v-flex>
                              <v-flex xs1 class="total text-xs-center">
                                ${{ carRentalTotal }}
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Food & Beverage</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs3 offset-xs2>
                                <v-text-field
                                  name="foodBeveragePrice"
                                  v-model.number="goal.foodBeveragePrice"
                                  :rules="[v => !!v || 'A food & beverage price is required']"
                                  hint="Use '00' if not applicable"
                                  prefix="$"
                                  placeholder="0"
                                  single-line
                                  mask="#######"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">close</v-icon>
                              </v-flex>
                              <v-flex xs1>
                                <v-text-field
                                  name="foodBeverageQuantity"
                                  v-model.number="goal.foodBeverageQuantity"
                                  single-line
                                  min=0
                                  type="number"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <span class="describer primary--text"><strong>days</strong></span>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">mdi-equal</v-icon>
                              </v-flex>
                              <v-flex xs1 class="total text-xs-center">
                                ${{ foodBeverageTotal }}
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Activities</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs3 offset-xs2>
                                <v-text-field
                                  name="activitiesPrice"
                                  v-model.number="goal.activitiesPrice"
                                  :rules="[v => !!v || 'An activites price is required']"
                                  hint="Use '00' if not applicable"
                                  prefix="$"
                                  placeholder="0"
                                  single-line
                                  mask="#######"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">close</v-icon>
                              </v-flex>
                              <v-flex xs1>
                                <v-text-field
                                  name="activitiesQuantity"
                                  v-model.number="goal.activitiesQuantity"
                                  single-line
                                  min=0
                                  type="number"
                                  required
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <span class="describer primary--text"><strong>days</strong></span>
                              </v-flex>
                              <v-flex xs1 class="text-xs-center">
                                <v-icon color="primary" small class="math">mdi-equal</v-icon>
                              </v-flex>
                              <v-flex xs1 class="total text-xs-center">
                                ${{ activitiesTotal }}
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex class="text-xs-center" xs8 offset-xs2>
                                You will need an approximate total of <strong>${{ approximateTotal }}</strong>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex class="text-xs-center" xs8 offset-xs2>
                                to hit your goal and travel to {{ goal.destination }}.
                              </v-flex>
                            </v-layout>
                            <br>
                            <v-divider light></v-divider>
                            <br>
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-checkbox
                                  @change="estimateCheck"
                                  v-model="goal.generalEstimateCheck"
                                  label="I'd rather just make a general estimate for now"
                                ></v-checkbox>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex offset-xs2 class="estimateLayout">
                                <v-subheader class="estimateHeader">Estimate</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs6 offset-xs2 class="estimateLayout">
                                <v-text-field
                                  name="generalEstimateAmount"
                                  v-model.number="goal.generalEstimateAmount"
                                  prefix="$"
                                  placeholder="0"
                                  mask="#######"
                                  :disabled="!goal.generalEstimate"
                                >
                                </v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                        <v-layout row>
                          <v-flex class="text-xs-center">
                            <v-btn
                              color="secondary"
                              @click.native="nextStep"
                              :disabled="!stepTwoValid"
                              round
                              class="next"
                            >
                              Next Step
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-stepper-content>

                      <v-stepper-content step="3">
                        <v-container fluid grid-list-xs>
                          <v-form ref="form3" v-model="stepThreeValid">
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="text-xs-left ml-0 pl-0 chooseVisual">
                                  Choose a visual for your goal
                                </v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs3 offset-xs2>
                                <div class="uploadArea">
                                  <v-container v-if="!goal.image">
                                    <v-layout row>
                                      <v-flex class="uploadClick">
                                        <label class="text-xs-center uploadButton">
                                          <input
                                            type="file"
                                            @change="onImageSelected"
                                            class="mt-1 inputFile"
                                          >
                                          <img src="~/assets/images/upload.png" contain alt="upload">
                                          <br>
                                          <span>Upload an image</span>
                                        </label>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                  <v-layout v-else>
                                    <v-flex>
                                      <img :src="goal.image" class="imagePreview"/>
                                    </v-flex>
                                  </v-layout>
                                </div>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Your Goal Amount</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs5 offset-xs2>
                                <v-text-field
                                  name="goalAmount"
                                  prefix="$"
                                  single-line
                                  v-model="goalAmount"
                                  readonly
                                >
                                </v-text-field>
                              </v-flex>
                              <v-flex xs2 class="text-xs-center">
                                <v-btn
                                  color="primary"
                                  flat
                                  @click.native="prevStep"
                                  class="edit"
                                >
                                  Edit Estimate
                                </v-btn>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Desired Departure Date</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2>
                                <v-menu
                                  ref="menu"
                                  :close-on-content-click="true"
                                  v-model="goal.menu"
                                  :nudge-top="20"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  max-width="290px"
                                  min-width="290px"
                                  :disabled="goal.unknownMonth"
                                >
                                  <v-text-field
                                    slot="activator"
                                    v-model="monthConverted"
                                    :disabled="goal.unknownMonth"
                                    :rules="[v => !!v || `Desired depature date or 'I dont know yet' is required`]"
                                    readonly
                                  ></v-text-field>
                                  <v-date-picker
                                    v-model="goal.desiredMonth"
                                    type="month"
                                    no-title
                                    scrollable
                                    min="2018-06"
                                    color="primary"
                                  >
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex offset-xs2 class="dateCheckbox">
                                <v-checkbox
                                  @change="departureCheck"
                                  v-model="goal.unknownMonth"
                                  label="I don't know yet"
                                  class="mt-2"
                                ></v-checkbox>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">
                                  Have you asked your employer for time off yet?
                                </v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-radio-group
                                  v-model="goal.askEmployer"
                                  row
                                  required
                                  :rules="[v => !!v || 'Please select yes or no']"
                                >
                                  <v-radio label="Yes" value="yes" color="secondary"></v-radio>
                                  <v-radio label="No" value="no" color="secondary" class="radioNo"></v-radio>
                                </v-radio-group>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex offset-xs2>
                                <v-subheader class="costHeader">Your monthly contribution to this goal</v-subheader>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2>
                                <v-text-field
                                  name="monthly"
                                  prefix="$"
                                  single-line
                                  v-model="monthlyGoal"
                                  hint="Note: You can save for multiple goals at once"
                                  persistent-hint
                                  readonly
                                >
                                </v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2 class="text-xs-center mt-2">In order to reach your goal, you will need</v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs8 offset-xs2 class="text-xs-center mb-3">to save <strong>${{ goal.monthly ? goal.monthly.toFixed(2) : null }}</strong> every month</v-flex>
                            </v-layout>

                            <v-layout row>
                              <v-flex class="text-xs-center">
                                <v-btn
                                  color="secondary"
                                  @click.native="nextStep"
                                  :disabled="!stepThreeValid"
                                  round
                                >
                                  Save Goal
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </v-stepper-content>

                      <v-stepper-content step="4">
                        <v-container align-content-center>
                          <v-layout row>
                            <v-flex xs8 offset-xs2 class="text-xs-center">
                              <img src="~/assets/images/suitcase.png" alt="suitcase" class="mx-auto">
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex offset-xs2 class="text-xs-center">
                              <v-subheader>
                                You're one step closer towards your {{ goal.name }}.
                              </v-subheader>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex class="text-xs-center">
                              <v-btn
                                color="secondary"
                                href="/goals"
                                @click.prevent="submit"
                                nuxt
                                round
                              >
                                Go to My Goals
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-stepper-content>

                  </v-stepper-items>
                </v-stepper>
              </v-dialog>
            </v-layout>
        </v-container>
      <div v-if="goals.length > 0">
        <v-card
          v-for="(goal, id) in goals" :key="id"
          style="max-height: 220px;"
          class="my-4"
          hover
        >
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12>
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs4>
                      <img v-if="goal.image" :src="goal.image" contain class="goalsImage">
                      <h1 v-else class="caption text-xs-center mt-5">(No goal image uploaded)</h1>
                    </v-flex>
                    <v-flex xs8>
                      <div class="headline goalsTitle"><strong>{{ goal.name.toUpperCase() }}!</strong></div>
                      <br>
                      <div class="subheading">
                        Only {{ goal.weeksRemaining }} weeks until your trip to {{ goal.destination }}!
                      </div>
                      <br><br><br>
                      <div class="subheading">
                        ${{ goal.goalAmount }} of ${{ goal.goalAmount }}
                      </div>
                      <div id="rectangle"></div>
                      <v-btn round outline class="editGoal" color="grey darken-2">
                        Edit Goal
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      goal: {
        index: null,
        name: null,
        destination: null,
        type: null,
        lengthTime: null,
        flightPrice: null,
        flightQuantity: 1,
        flightTotal: 0,
        accomodationPrice: null,
        accomodationQuantity: null,
        accomodationTotal: 0,
        carRentalPrice: null,
        carRentalQuantity: null,
        carRentalTotal: 0,
        foodBeveragePrice: null,
        foodBeverageQuantity: null,
        foodBeverageTotal: 0,
        activitiesPrice: null,
        activitiesQuantity: null,
        activitiesTotal: 0,
        approximateTotal: 0,
        generalEstimate: false,
        generalEstimateCheck: false,
        generalEstimateAmount: null,
        image: null,
        menu: false,
        goalAmount: null,
        desiredMonth: null,
        unknownMonth: false,
        askEmployer: null,
        monthly: null,
        weeksRemaining: null
      },
      valueDeterminate: 33.34,
      step: 1,
      stepOneValid: false,
      stepTwoValid: false,
      stepThreeValid: false,
      gradient: 'to right, #3687c6 , #56c2cb',
      types: [
        'Adventure',
        'All Inclusive',
        'Backpacking',
        'Beach',
        'Cruising',
        'Group Tour',
        'Honeymoon',
        'Package',
        'Recreational',
        'Road Trip',
        'Safari'
      ]
    }),
    methods: {
      toggleDialog () {
        this.$store.commit('toggleDialog')
      },
      nextStep () {
        if (this.step === 1 && this.$refs.form1.validate()) {
          this.goal.accomodationQuantity = this.goal.lengthTime
          this.goal.carRentalQuantity = this.goal.lengthTime
          this.goal.foodBeverageQuantity = this.goal.lengthTime
          this.goal.activitiesQuantity = this.goal.lengthTime
          this.step += 1
          this.valueDeterminate += 33.34
        } else if (this.step === 2) {
          if (this.$refs.form2.validate() || this.goal.generalEstimateAmount > 0) {
            this.step += 1
            this.valueDeterminate += 33.34
          }
        } else if (this.step === 3) {
          if (this.$refs.form3.validate()) {
            this.step += 1
          }
        }
      },
      prevStep () {
        this.step -= 1
        this.valueDeterminate -= 33.34
      },
      estimateCheck: function () {
        this.goal.generalEstimate = !this.goal.generalEstimate
        this.stepTwoValid = !this.stepTwoValid
      },
      departureCheck: function () {
        if (this.goal.askEmployer) {
          this.stepThreeValid = !this.stepThreeValid
        }
      },
      daysInitial () {
        return this.lengthTime
      },
      onImageSelected (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        // let image = new Image()
        let reader = new FileReader()
        let vm = this

        reader.onload = (e) => {
          vm.goal.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      submit () {
        let i = this.goals.length
        this.goal.index = i + 1
        this.$store.commit('addGoal', this.goal)
        this.$store.commit('toggleDialog')
        this.goal = {
          index: null,
          name: null,
          destination: null,
          type: null,
          lengthTime: null,
          flightPrice: null,
          flightQuantity: 1,
          flightTotal: 0,
          accomodationPrice: null,
          accomodationQuantity: null,
          accomodationTotal: 0,
          carRentalPrice: null,
          carRentalQuantity: null,
          carRentalTotal: 0,
          foodBeveragePrice: null,
          foodBeverageQuantity: null,
          foodBeverageTotal: 0,
          activitiesPrice: null,
          activitiesQuantity: null,
          activitiesTotal: 0,
          approximateTotal: 0,
          generalEstimate: false,
          generalEstimateCheck: false,
          generalEstimateAmount: null,
          image: null,
          menu: false,
          goalAmount: null,
          desiredMonth: null,
          unknownMonth: false,
          askEmployer: null,
          monthly: null,
          weeksRemaining: null
        }
        this.step = 1
        this.valueDeterminate = 33.34
        this.stepOneValid = false
        this.stepTwoValid = false
        this.stepThreeValid = false
      }
    },
    mounted: function () {
      if (this.$store.state.dialog === false) {
        this.$store.commit('toggleDialog')
      }
    },
    computed: {
      goals: function () {
        return this.$store.getters.goals
      },
      dialog: function () {
        return this.$store.state.dialog
      },
      flightTotal () {
        this.goal.flightTotal = this.goal.flightPrice * this.goal.flightQuantity
        return this.goal.flightTotal
      },
      accomodationTotal () {
        this.goal.accomodationTotal = this.goal.accomodationPrice * this.goal.accomodationQuantity
        return this.goal.accomodationTotal
      },
      carRentalTotal () {
        this.goal.carRentalTotal = this.goal.carRentalPrice * this.goal.carRentalQuantity
        return this.goal.carRentalTotal
      },
      foodBeverageTotal () {
        this.goal.foodBeverageTotal = this.goal.foodBeveragePrice * this.goal.foodBeverageQuantity
        return this.goal.foodBeverageTotal
      },
      activitiesTotal () {
        this.goal.activitiesTotal = this.goal.activitiesPrice * this.goal.activitiesQuantity
        return this.goal.activitiesTotal
      },
      approximateTotal () {
        this.goal.approximateTotal =
          this.goal.flightTotal +
          this.goal.accomodationTotal +
          this.goal.carRentalTotal +
          this.goal.foodBeverageTotal +
          this.goal.activitiesTotal

        return this.goal.approximateTotal
      },
      goalAmount () {
        this.goal.goalAmount = this.goal.generalEstimate ? this.goal.generalEstimateAmount : this.goal.approximateTotal
        return this.goal.goalAmount
      },
      monthlyGoal () {
        if (this.goal.desiredMonth && !this.goal.unknownMonth) {
          let desiredYear = (this.goal.desiredMonth).slice(0, 4)
          let desiredMonth = (this.goal.desiredMonth).slice(5)
          let date = new Date()
          let currentMonth = date.getMonth() + 1
          let currentYear = date.getFullYear()

          let numberMonths = (desiredYear - currentYear) * 12 + (desiredMonth - currentMonth)
          if (this.goal.generalEstimate) {
            this.goal.monthly = this.goal.generalEstimateAmount / numberMonths
          } else {
            this.goal.monthly = this.goal.approximateTotal / numberMonths
          }
          this.goal.weeksRemaining = Math.round(numberMonths * 4.34524)
          return this.goal.monthly.toFixed(2)
        }
      },
      monthConverted () {
        if (this.goal.desiredMonth && !this.goal.unknownMonth) {
          let desiredYear = (this.goal.desiredMonth).slice(0, 4)
          let desiredMonth = (this.goal.desiredMonth).slice(5)
          let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
          let month = months[parseInt(desiredMonth, 10) - 1]
          let desiredDeparture = `${month} ${desiredYear}`
          return desiredDeparture
        }
      }
    }
  }
</script>

<style scoped>
.content {
  padding: 64px 0px 0px 200px;
}
span {
  display: inline-block;
  margin-bottom: 15px;
}
.add-goal {
  float: right;
  margin-top: -1px;
}
.goal-title {
  text-align: center;
}
.dialogForm {
  border-radius: 5px !important;
}
.form-title {
  font-size: 20px;
  padding-top: 10px;
}
.progress-linear {
  margin-top: 0;
}
.costHeader {
  margin-top: -16px;
  margin-bottom: -35px;
  margin-left: -15px;
}
.math {
  padding-top: 30px;
}
.describer {
  padding-top: 27px;
  padding-left: 10px;
}
.total {
  font-size: 20px;
  font-weight: 450;
  margin-top: 22px;
}
.estimateHeader {
  margin-left: -15px;
  margin-bottom: -10px;
}
.estimateLayout {
  margin-top: -30px;
}
.uploadArea {
  border: 1px solid #616161;
  border-radius: 5px;
  height: 100px;
  width: 155px;
  margin-bottom: 16px;
  margin-top: -8px;
}
input[type="file"] {
  display: none;
}
.uploadButton {
  font-size: 14px;
  font-weight: 500;
  color: #3687c6;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  width: 100%;
  margin: 10px auto;
}
.imagePreview {
  height: 101px;
  border-radius: 5px;
  margin-top: -1px;
  margin-left: -1px;
}
.edit {
  margin-top: 15px;
}
.dateCheckbox {
  margin-top: -20px;
}
.chooseVisual {
  margin-top: -21px;
}
.radioNo {
  margin-left: -300px;
}
div.progress-linear__bar__determinate.primary {
  height: 200px;
}
#rectangle {
  max-width: 500px;
  height:15px;
  background: linear-gradient(to right, #3687c6 15%, #56c2cb);
  border-radius: 10px;
  margin-top: 5px;
}
.editGoal {
 float: right;
 margin-top: -30px;
}
.goalsImage {
  margin-top: -32px;
  margin-left: -32px;
  height: 220px;
  width: 340px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.goalsTitle {
  margin-top: -20px;
}
</style>

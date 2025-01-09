<template>
  <div class="employee pa-16">
    <v-card elevation="16" class="pa-16">
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-account-multiple"></v-icon> &nbsp; Employee Records
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>

        <!-- Add Employee Dialog -->
        <div class="text-center ml-5">
          <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                class="text-none font-weight-regular"
                prepend-icon="mdi-account"
                text="Add Employee"
                variant="tonal"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card prepend-icon="mdi-account" title="Employee Profile">
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="12" md="12">
                    <v-autocomplete
                      :items="country"
                      label="Country"
                      v-model="newEmployee.country"
                      auto-select-first
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-autocomplete
                      :items="accountTypes"
                      label="Account Type"
                      v-model="newEmployee.account_type"
                      auto-select-first
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      label="Username*"
                      v-model="newEmployee.username"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="First name*"
                      v-model="newEmployee.firstname"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Last name*"
                      v-model="newEmployee.lastname"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Email*"
                      v-model="newEmployee.email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Contact Number*"
                      v-model="newEmployee.contact_number"
                      required
                      maxlength="11"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-file-input
                      label="Photo(Optional)"
                      variant="outlined"
                      v-model="newEmployee.photo"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <small class="text-caption text-medium-emphasis"
                  >*indicates required field</small
                >
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close"
                  variant="plain"
                  @click="dialog = false"
                ></v-btn>

                <v-btn
                  color="primary"
                  text="Save"
                  variant="tonal"
                  @click="addEmployee"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        density="compact"
        item-key="fullname"
        class="text-center"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-left" v-if="item.photo_path">
              <v-img
                :src="`http://localhost:5000/${item.photo_path}`"
                max-width="150"
                max-height="150"
                contain
              ></v-img>
            </td>
            <td class="text-left" v-else>
              <v-img
                :src="require('../assets/default.jpg')"
                max-width="150"
                max-height="150"
                contain
              ></v-img>
            </td>
            <td class="text-left">{{ item.fullname }}</td>
            <td class="text-left">{{ item.username }}</td>
            <td class="text-left">{{ item.country }}</td>
            <td class="text-left">{{ item.email }}</td>
            <td class="text-left">{{ item.account_type }}</td>
            <td class="text-left">
              <!-- EDIT -->
              <div>
                <v-dialog v-model="dialogUpdate" max-width="600">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      text="Edit"
                      color="primary"
                      variant="tonal"
                      size="small"
                      v-bind="activatorProps"
                      @click="editEmployee(item)"
                    >
                    </v-btn>
                  </template>

                  <v-card prepend-icon="mdi-account" title="Employee Profile">
                    <v-card-text>
                      <v-col cols="12" md="12" sm="12" class="d-flex">
                        <v-avatar
                          color="grey"
                          rounded="12px"
                          size="200"
                          class="mt-3 mx-auto"
                        >
                          <v-img
                            :src="
                              update.photo_path
                                ? update.photo_path.startsWith('http')
                                  ? update.photo_path
                                  : `http://localhost:5000/${update.photo_path}`
                                : require('../assets/default.jpg')
                            "
                            cover
                          ></v-img>
                        </v-avatar>
                      </v-col>
                      <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                          <v-autocomplete
                            :items="country"
                            label="Country"
                            v-model="update.country"
                            auto-select-first
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-autocomplete
                            :items="accountTypes"
                            label="Account Type"
                            v-model="update.account_type"
                            auto-select-first
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                          <v-text-field
                            label="Username*"
                            v-model="update.username"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="First name*"
                            v-model="update.firstname"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Last name*"
                            v-model="update.lastname"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Email*"
                            v-model="update.email"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-text-field
                            label="Contact Number*"
                            v-model="update.contact_number"
                            required
                            maxlength="11"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <small class="text-caption text-medium-emphasis"
                        >*indicates required field</small
                      >
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Close"
                        variant="plain"
                        @click="dialogUpdate = false"
                      ></v-btn>

                      <v-btn
                        color="primary"
                        text="Save"
                        variant="tonal"
                        @click="updateEmployee"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <!-- DELETE -->
              <v-btn
                class="mt-2"
                color="red"
                variant="tonal"
                size="small"
                @click="deleteEmployee(item.id)"
              >
                Delete
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ message }}

        <template v-slot:actions>
          <v-btn color="blue" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import constant from "@/constant";
import axios from "axios";
import utils from "@/utils";
export default {
  name: "EmployeeView",
  data() {
    return {
      snackbar: false,
      message: "",
      constant: constant,
      country: ["Philippines", "Malaysia", "China", "Vietnam", "Indonesia"],
      accountTypes: ["Team Lead", "Team Member", "Project Lead", "QA Lead"],
      newEmployee: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        contact_number: "",
        country: "",
        account_type: "",
        photo: null,
      },
      dialog: false,
      dialogUpdate: false,
      search: "",
      update: {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        contact_number: "",
        country: "",
        account_type: "",
        photo_path: null,
      },
      headers: [
        { title: "Photo", align: "start", sortable: false, key: "photo_path" },
        { title: "Name", align: "start", key: "fullname" },
        { title: "Username", align: "start", key: "username" },
        { title: "Country", align: "start", key: "country" },
        { title: "Email", align: "start", key: "email" },
        { title: "Account Type", align: "start", key: "account_type" },
        { title: "", align: "start", key: "action" },
      ],
      data: [],
    };
  },

  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },
    triggerFileInput() {
      this.$refs.fileInput.$el.querySelector("input").click();
    },
    async fetchEmployees() {
      try {
        const url = utils._api(this.constant.fetchEmployees);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        this.data = response.data.map((employee) => ({
          id: employee.id,
          photo_path: employee.photo_path,
          fullname: `${employee.first_name} ${employee.last_name}`,
          username: employee.username,
          country: employee.country,
          email: employee.email,
          account_type: employee.account_type,
          firstname: employee.first_name,
          lastname: employee.last_name,
          contact_number: employee.contact_number,
        }));
        console.log("Employees:", this.data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    },

    editEmployee(employee) {
      this.update = { ...employee };
      this.dialogUpdate = true;
      console.log("update:", this.update);
    },
    async addEmployee() {
      try {
        const url = utils._api(this.constant.addEmployee);

        const formData = new FormData();
        formData.append("first_name", this.newEmployee.firstname);
        formData.append("last_name", this.newEmployee.lastname);
        formData.append("username", this.newEmployee.username);
        formData.append("email", this.newEmployee.email);
        formData.append("contact_number", this.newEmployee.contact_number);
        formData.append("country", this.newEmployee.country);
        formData.append("account_type", this.newEmployee.account_type);
        if (this.newEmployee.photo) {
          formData.append("photo_path", this.newEmployee.photo);
        }

        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.newEmployee = {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          contact_number: "",
          country: "",
          account_type: "",
          photo: null,
        };
        this.snackbar = true;
        this.message = "New Employee inserted successfuly!";
        console.log("Employee added:", response.data);

        this.dialog = false;
        this.fetchEmployees();
      } catch (error) {
        console.error("Error adding employee:", error.message);
      }
    },
    async updateEmployee() {
      try {
        const url = utils._api(this.constant.updateEmployee);

        const formData = new FormData();
        formData.append("id", this.update.id);
        formData.append("first_name", this.update.firstname);
        formData.append("last_name", this.update.lastname);
        formData.append("username", this.update.username);
        formData.append("email", this.update.email);
        formData.append("contact_number", this.update.contact_number);
        formData.append("country", this.update.country);
        formData.append("account_type", this.update.account_type);
        if (this.update.photo_path) {
          formData.append("photo_path", this.update.photo_path);
        }

        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Employee updated:", response.data);

        this.dialogUpdate = false;
        this.snackbar = true;
        this.message = "Update Employee successfuly!";
        this.fetchEmployees();
      } catch (error) {
        console.error("Error updating employee:", error.message);
      }
    },

    async deleteEmployee(employeeId) {
      try {
        const url = utils._api(this.constant.deleteEmployee);

        const response = await axios.post(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          id: employeeId,
        });

        console.log("Employee deleted:", response.data);
        this.snackbar = true;
        this.message = "Delete Employee successfuly!";
        this.fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error.message);
      }
    },
  },

  mounted() {
    this.fetchEmployees();
  },
};
</script>

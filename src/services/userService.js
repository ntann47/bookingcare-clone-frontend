import axios from "../axios";
const handleLoginAPI = (data) => {
  return axios.post("/api-login", data);
};
const handleGetAllUser = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`);
};
const handleCreateNewUser = (data) => {
  return axios.post("/api/create-new-user", data);
};
const handleDeleteUser = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};
const editUserService = (user) => {
  return axios.put("/api/edit-user", user);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/get-all-code?type=${inputType}`);
};

const getTopDoctorsHomeService = (limit) => {
  return axios.get(`/api/top-doctors-home?limit=${limit}`);
};
const handleGetAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const handleSaveDoctorInfoService = (inputData) => {
  return axios.post(`/api/save-doctor-info`, inputData);
};
const handleGetDoctorDetailByIdService = (doctorId) => {
  return axios.get(`/api/get-doctor-detail-by-id?id=${doctorId}`);
};
const handleBulkCreateScheduleService = (data) => {
  return axios.post(`/api/bulk-create-schedules`, data);
};
const handleGetDoctorScheduleByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-doctor-schedule-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const handleGetMoreDoctorInfoByIdService = (doctorId) => {
  return axios.get(`/api/get-more-doctor-info-by-id?doctorId=${doctorId}`);
};
const handleGetDoctorProfileByIdService = (doctorId) => {
  return axios.get(`/api/get-doctor-profile-by-id?doctorId=${doctorId}`);
};
const handlePostPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const handlePostVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment/`, data);
};
const handleCreateNewSpecialtyService = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const handleGetAllSpecialtyService = () => {
  return axios.get(`/api/get-all-specialty`);
};
const handleGetSpecialtyDetailByIdService = (id, location) => {
  return axios.get(
    `/api/get-specialty-detail-by-id?id=${id}&location=${location}`
  );
};

const handleCreateNewClinicService = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};
const handleGetAllClinicService = () => {
  return axios.get(`/api/get-all-clinic`);
};
const handleGetClinicDetailByIdService = (id) => {
  return axios.get(`/api/get-clinic-detail-by-id?id=${id}`);
};
const handleGetListPatientForDoctorService = (id, date) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${id}&date=${date}`
  );
};
const handleSendRemedyService = (data) => {
  return axios.post(`/api/send-remedy`, data);
};
export {
  handleLoginAPI,
  handleGetAllUser,
  handleCreateNewUser,
  handleDeleteUser,
  editUserService,
  getAllCodeService,
  getTopDoctorsHomeService,
  handleGetAllDoctorsService,
  handleSaveDoctorInfoService,
  handleGetDoctorDetailByIdService,
  handleBulkCreateScheduleService,
  handleGetDoctorScheduleByDateService,
  handleGetMoreDoctorInfoByIdService,
  handleGetDoctorProfileByIdService,
  handlePostPatientBookAppointment,
  handlePostVerifyBookAppointment,
  handleCreateNewSpecialtyService,
  handleGetAllSpecialtyService,
  handleGetSpecialtyDetailByIdService,
  handleCreateNewClinicService,
  handleGetAllClinicService,
  handleGetClinicDetailByIdService,
  handleGetListPatientForDoctorService,
  handleSendRemedyService,
};

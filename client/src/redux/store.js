import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './RegisterationSlice';
import authReducer from './LoginSlice';
import inventoryReducer from './inventorySlice';
import locationReducer from './locationSlice';
import submitReducer from './submitSlice';
import donorReducer from './donorSlice';
import memberReducer from './memberSlice';
import dashboardReducer from './dashboardSlice';
import memberDashboardReducer from '../redux/member/memberdashboard';
import memberSubmitReducer from '../redux/member/memberSubmitSlice';
import memberDonorReducer from '../redux/member/memberDonorSlice';
import UserReducer from './users';
import certificateReducer from './certificate';
import membercertificateReducer from './member/memberCertificate';
import memberProfileReducer from './member/memberProfile';
import adminProfileReducer from './adminprofile';
import blogReducer from './blog';
import programReducer from './program';
import programsReducer from './homepagePrograms';
import blogsReducer from './homeblogs';
import homepieReducer from './homepiechat';


export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    inventory: inventoryReducer,
    location: locationReducer,
    submit: submitReducer,
    donor: donorReducer,
    member: memberReducer,
    dashboard: dashboardReducer,
    memberDashboard: memberDashboardReducer,
    memberSubmit:memberSubmitReducer,
    memberDonor: memberDonorReducer,
    users: UserReducer,
    certificates: certificateReducer,
    membercertificate: membercertificateReducer,
    memberProfile: memberProfileReducer,
    adminProfile: adminProfileReducer,
    blog:blogReducer,
    program:programReducer,
    programs: programsReducer,
    blogs: blogsReducer,
    donations:homepieReducer,
  },
});
import {Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';

import SignIn from '@/pages/auth/signin';

import ForgetPassword from '@/pages/auth/forget-password';

import CreatePassword from '@/pages/auth/create-password';

//import ClaimsHistory from '@/pages/dashboard/reports/cliams-history';
import AllHospitals from '@/pages/dashboard/hospitals/all-hospitals';
import HospitalDetails from '@/pages/dashboard/hospitals/hospital-details';
import AllTransactions from '@/pages/dashboard/transactions/all-transactions';
import Refunds from '@/pages/dashboard/transactions/refunds';
import Checkers from '@/pages/dashboard/checker';
import Users from '@/pages/dashboard/reports/users';
import UsersDetails from '@/features/modules/report/user-details';
import Reporting from '@/pages/dashboard/reports/reporting';
import Settings from '@/pages/dashboard/settings';
import VerificationRequest from '@/pages/dashboard/doctors/request';
import AllDoctors from '@/pages/dashboard/doctors/all-doctors';
import DoctorDetails from '@/pages/dashboard/doctors/doctor-detail';
import MarketingCampaign from '@/pages/dashboard/marketing';
import Amenities from '@/pages/dashboard/ambulance/amenities';
import Providers from '@/pages/dashboard/ambulance/provider';
import Request from '@/pages/dashboard/ambulance/request';
import Drivers from '@/pages/dashboard/ambulance/drivers';
import Responders from '@/pages/dashboard/ambulance/responder';
import ResponderNote from '@/pages/dashboard/ambulance/responder-note';
import DispatchHistory from '@/pages/dashboard/ambulance/history';
import FAQ from '@/pages/dashboard/helpdesk/faq';
import Tutorials from '@/pages/dashboard/helpdesk/tutorial';
import Articles from '@/pages/dashboard/helpdesk/articles';
import ArticleDetails from '@/pages/dashboard/helpdesk/article-details';
import Feedbacks from '@/pages/dashboard/helpdesk/feedback';
import EmergencyCall from '@/pages/dashboard/reports/emergency';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Auth */}

      <Route path={ROUTES.signin} element={<SignIn />} />
      <Route path={ROUTES.forgot} element={<ForgetPassword />} />
      <Route path={ROUTES.reset} element={<CreatePassword />} />

      <Route path={ROUTES.hospitals.all} element={<AllHospitals />} />
      <Route path={ROUTES.hospitals.details} element={<HospitalDetails />} />

      <Route path={ROUTES.transactions.all} element={<AllTransactions />} />
      <Route path={ROUTES.transactions.refunds} element={<Refunds />} />

      <Route path={ROUTES.checkers} element={<Checkers />} />

      <Route path={ROUTES.reports.users} element={<Users />} />
      <Route path={ROUTES.reports.userdetails} element={<UsersDetails />} />
      <Route path={ROUTES.reports.reporting} element={<Reporting />} />
       <Route path={ROUTES.reports.call} element={<EmergencyCall />} />

      <Route path={ROUTES.settings} element={<Settings />} />


      <Route path={ROUTES.doctors.request} element={<VerificationRequest />} />
      <Route path={ROUTES.doctors.all} element={<AllDoctors />} />
      <Route path={ROUTES.doctors.details} element={<DoctorDetails />} />

      <Route path={ROUTES.marketing} element={<MarketingCampaign />} />
       
      <Route path={ROUTES.ambulance.amenities} element={<Amenities />} />
      <Route path={ROUTES.ambulance.providers} element={<Providers />} />
      <Route path={ROUTES.ambulance.requests} element={<Request />} />
      <Route path={ROUTES.ambulance.drivers} element={<Drivers />} />
      <Route path={ROUTES.ambulance.responders} element={<Responders />} />
      <Route path={ROUTES.ambulance.note} element={<ResponderNote />} />
      <Route path={ROUTES.ambulance.history} element={<DispatchHistory />} />


      <Route path={ROUTES.helpdesk.faq} element={<FAQ />} />
      <Route path={ROUTES.helpdesk.tutorial} element={<Tutorials />} />
      <Route path={ROUTES.helpdesk.articles} element={<Articles />} />
      <Route path={ROUTES.helpdesk.details} element={<ArticleDetails />} />
      <Route path={ROUTES.helpdesk.feedback} element={<Feedbacks />} />


    </Routes>
  );
};

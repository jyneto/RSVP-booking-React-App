import SelectDate from "./components/SelectDate";
import SelectTable from "./components/SelectTable";
import ContactDetails from "./components/ContactDetails";
import Confirmation from "./components/Confirmation";
import {useBooking} from "./context/BookingCtx";
import ProgressBar from "./components/ProgressBar";

export default function App() {
    const {state} = useBooking();

    return (
         <div style={{
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8f5ec 60%, #c2c7b0 100%)',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      </div>
           <h1 style={{fontSize:'1.5rem',margin:'18px 0 8px 0',fontWeight:700,color:'#7a8450',letterSpacing:'1px',textAlign:'center'}}>RSVP</h1>
                
                <ProgressBar />
                    
        <div style={{marginTop: 12}}>
          {state.step === 1 && <SelectDate />}
          {state.step === 2 && <ContactDetails />}
          {state.step === 3 && (state.isAttending ? <SelectTable /> : <Confirmation />)}
          {state.step === 4 && <Confirmation />}
        </div>
          
            <footer style={{marginTop: 24, textAlign:'center'}}>
                <a href={import.meta.env.VITE_MVC_URL} className="wedding-btn" rel="noreferrer" >Homepage</a>
            </footer>
        </div>
          
    );
}

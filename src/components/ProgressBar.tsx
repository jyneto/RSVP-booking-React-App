import { useBooking } from "../context/BookingCtx";

export default function ProgressBar() {
    const { state } = useBooking();
    // Steps: 1=SelectDate, 2=ContactDetails, 3=SelectTable (if attending) or Confirmation, 4=Confirmation
    const totalSteps = state.isAttending === false ? 3 : 4;
    const currentStep = Math.min(state.step, totalSteps);
    const progressPercentage = Math.max((currentStep / totalSteps) * 100, 10);

    return (
        <div className="progressbar">
            <div className="progressbar-fill" style={{width: `${progressPercentage}%`}} />
            <span className="progressbar-label">{currentStep}/{totalSteps}</span>
        </div>
    );
}
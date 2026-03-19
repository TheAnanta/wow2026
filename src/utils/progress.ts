
enum Progress {
    noApplication, // Fresh applicant
    paymentPending, // Payment is pending or payment failed
    incompleteRegistration, // User needs to form team or complete registration
    notYetTeamMember, // User is not a team member
    completeRegistration, // User has completed registration
    completeRegistrationTeamLead, // User has completed registration and is teamLead
}
export default Progress;
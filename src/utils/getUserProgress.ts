/* eslint-disable @typescript-eslint/no-unused-vars */
import { getDoc, doc } from "firebase/firestore";
import getDocument from "./getData";
import Progress from "./progress";
import { db } from "@/lib/firebase";

export default async function GetUserProgress(userId: string): Promise<Progress | string> {
    try {
        const document = await getDoc(doc(db, "users", userId));

        const response = document.data();
        if (response === undefined || response.registrationDetails === undefined) {
            return Progress.noApplication;
        }
        if (response.registrationDetails.isTeamLead === 1) {
            return Progress.completeRegistrationTeamLead;
        }
        if (response.registrationDetails.isTeamMember === 1) {
            return Progress.completeRegistration;
        }
        if (response.tshirtSize !== undefined && response.tshirtSize !== null && response.tshirtSize !== "") {
            return Progress.notYetTeamMember;
        }
        if (response.paymentStatus === true) {
            return Progress.incompleteRegistration;
        }
        if (response.coc === true) {
            return Progress.paymentPending;
        }
        return Progress.noApplication;
    } catch (e) {
        return e as string;
    }

}

import config from "../../../../../config";

export const constructVerificationEmailPayload = (name, email, code) => ({
  template: "call_to_action",
  data: {
    header: "Activate Account",
    text: "Your almost there. To finish activating your account please click the link below.",
    c2a_name: name,
    c2a_link: `${config.FRONTEND_BASE_URL}/verify/${code}`,
    c2a_button: "Activate Account",
  },
  options: {
    to: [email],
    subject: "Activate your account",
  },
});

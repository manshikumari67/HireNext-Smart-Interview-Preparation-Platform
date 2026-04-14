import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // ✅ Get email safely
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("signupEmail");

    console.log("Stored Email:", storedEmail); // 🔥 debug

    if (!storedEmail) {
      toast.error("Session expired. Please signup again");
      navigate("/signup");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  // ✅ VERIFY OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending:", email, otp); // 🔥 debug

      const response = await API.post("/auth/verify-otp", {
        email: email,
        otp: otp.toString(), // ✅ IMPORTANT FIX
      });

      toast.success(response.data.message || "Verified successfully");

      sessionStorage.removeItem("signupEmail");

      navigate("/login");
    } catch (error) {
      console.error("Verify Error:", error); // 🔥 debug

      toast.error(
        error.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESEND OTP
  const handleResend = async () => {
    if (resending) return;

    try {
      setResending(true);
      toast.info("Sending OTP...");

      const response = await API.post("/auth/send-otp", {
        email: email,
      });

      toast.success(response.data.message || "OTP sent successfully");
    } catch (error) {
      console.error("Resend Error:", error); // 🔥 debug
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex items-center justify-center">
      <div className="w-[420px] bg-white p-8 rounded-xl shadow-lg text-center">

        <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          📩
        </div>

        <h2 className="text-xl font-semibold">Verify Your Email</h2>

        <p className="text-sm text-gray-500 mb-6">
          Enter the OTP sent to <br />
          <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">

          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
            }}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  fontSize: "22px",
                  textAlign: "center",
                  backgroundColor: "#F9FAFB",
                }}
              />
            )}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Didn't get OTP?{" "}
            <button
              type="button"
              disabled={resending}
              onClick={handleResend}
              className="text-blue-600 font-semibold hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend"}
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}
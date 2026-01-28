import { useState } from "react";

const STEPS = ["Shipping", "Billing", "Payment", "Review"];

const initialData = {
  shipping: { address: "" },
  billing: { address: "" },
  payment: { card: "" },
};

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = (stepIndex) => {
    const newErrors = {};

    if (stepIndex === 0 && !data.shipping.address) {
      newErrors.shipping = "Shipping address is required";
    }

    if (stepIndex === 1 && !data.billing.address) {
      newErrors.billing = "Billing address is required";
    }

    if (stepIndex === 2 && !data.payment.card) {
      newErrors.payment = "Card number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validate(step)) {
      setStep(step + 1);
    }
  };

  const back = () => setStep(step - 1);

  const jumpTo = (index) => {
    for (let i = 0; i < index; i++) {
      if (!validate(i)) return;
    }
    setStep(index);
  };

  const updateData = (section, value) => {
    setData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h3>Checkout Wizard</h3>

      <div style={{ display: "flex", gap: 10 }}>
        {STEPS.map((label, i) => (
          <button
            key={label}
            onClick={() => jumpTo(i)}
            disabled={i > step}
            style={{
              fontWeight: i === step ? "bold" : "normal",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {step === 0 && (
          <>
            <input
              placeholder="Shipping Address"
              value={data.shipping.address}
              onChange={(e) =>
                updateData("shipping", { address: e.target.value })
              }
            />
            {errors.shipping && (
              <p style={{ color: "red" }}>{errors.shipping}</p>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <input
              placeholder="Billing Address"
              value={data.billing.address}
              onChange={(e) =>
                updateData("billing", { address: e.target.value })
              }
            />
            {errors.billing && <p style={{ color: "red" }}>{errors.billing}</p>}
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="Card Number"
              value={data.payment.card}
              onChange={(e) => updateData("payment", { card: e.target.value })}
            />
            {errors.payment && <p style={{ color: "red" }}>{errors.payment}</p>}
          </>
        )}

        {step === 3 && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={back} disabled={step === 0}>
          Back
        </button>

        {step < 3 && (
          <button onClick={next} style={{ marginLeft: 10 }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

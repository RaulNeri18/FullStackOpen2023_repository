import { HealthCheckEntry } from "../../types";

type HealthCheckProps = {
  entry : HealthCheckEntry
};

const HealthCheck = ({ entry } : HealthCheckProps) => {

  return (
    <div>
      <div>healthCheckRating: {entry.healthCheckRating.toString()}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheck;
import { SERVICE_GYM_ID, SERVICE_PILATES_ID, SERVICE_RECOVERY_ID, SERVICE_YOGA_ID } from "./env";

export function getId(serviceType: string) {
  let id;
  if (serviceType == "gym") {
    id = SERVICE_GYM_ID;
  } else if (serviceType == "yoga") {
    id = SERVICE_YOGA_ID;
  } else if (serviceType == "recovery") {
    id = SERVICE_RECOVERY_ID;
  } else if (serviceType == "pilates") {
    id = SERVICE_PILATES_ID;
  } else {
    id = "";
  }
  return id;
}

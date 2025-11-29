import { Portal } from "@gorhom/portal";
import Toast from "react-native-toast-message";

import { ROOT_PORTAL } from "@/app/_layout";

export function PortalizedToast() {
  return (
    <Portal hostName={ROOT_PORTAL}>
      <Toast position="bottom" />
    </Portal>
  );
}

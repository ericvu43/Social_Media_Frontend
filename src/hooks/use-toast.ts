// Simple toast implementation
type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

// Simple function to show a toast notification using console.log
// This is just a temporary solution until we implement proper toast functionality
function toast(options: ToastOptions) {
  console.log(`Toast: ${options.title} - ${options.description}`);

  return {
    id: "1",
    dismiss: () => {},
  };
}

function useToast() {
  return {
    toast,
  };
}

export { useToast, toast };

"use client";

interface ConfirmModalProps {
  open: boolean;
  message: string;
  onAccept: () => void;
  onClose?: () => void;
}

export default function ConfirmModal({
  open,
  message,
  onAccept,
  onClose,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          rounded-2xl bg-white p-6
          shadow-xl
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        <h2 className="text-lg font-semibold">
          Atención
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          {!!onClose && 
            <button
              onClick={onClose}
              className="
                rounded-lg px-4 py-2
                bg-gray-100 text-gray-700
                hover:bg-gray-200
              "
            >
              Cancelar
            </button>
          }
          <button
            onClick={onAccept}
            className="
              rounded-lg px-4 py-2
              bg-black text-white
              hover:bg-gray-800
            "
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

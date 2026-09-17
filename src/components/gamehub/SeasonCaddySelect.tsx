import {
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const TYPEAHEAD_RESET_MS = 5000;

type Option = {
  value: string;
  label: string;
};

type SeasonCaddySelectProps = {
  value: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (
    value: string,
  ) => void;
};

export function SeasonCaddySelect({
  value,
  options,
  placeholder =
    "Select",
  disabled = false,
  onChange,
}: SeasonCaddySelectProps) {
  const [
    open,
    setOpen,
  ] =
    useState(false);

  const [
    typeaheadQuery,
    setTypeaheadQuery,
  ] = useState("");

  const rootRef =
    useRef<HTMLDivElement>(
      null,
    );

  const typeaheadResetRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const selected =
    options.find(
      (
        option,
      ) =>
        option.value ===
        value,
    );

  const filteredOptions =
    useMemo(() => {
      const normalizedQuery =
        typeaheadQuery
          .trim()
          .toLocaleLowerCase();

      if (!normalizedQuery) {
        return options;
      }

      return options.filter(
        (option) =>
          option.label
            .toLocaleLowerCase()
            .includes(
              normalizedQuery,
            ),
      );
    }, [
      options,
      typeaheadQuery,
    ]);

  function clearTypeahead() {
    if (
      typeaheadResetRef.current
    ) {
      clearTimeout(
        typeaheadResetRef.current,
      );

      typeaheadResetRef.current =
        null;
    }

    setTypeaheadQuery("");
  }

  function scheduleTypeaheadReset() {
    if (
      typeaheadResetRef.current
    ) {
      clearTimeout(
        typeaheadResetRef.current,
      );
    }

    typeaheadResetRef.current =
      setTimeout(() => {
        setTypeaheadQuery("");
        typeaheadResetRef.current =
          null;
      }, TYPEAHEAD_RESET_MS);
  }

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        rootRef.current &&
        !rootRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(
          false,
        );

        clearTypeahead();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );

      if (
        typeaheadResetRef.current
      ) {
        clearTimeout(
          typeaheadResetRef.current,
        );
      }
    };
  }, []);

  function handleTypeaheadKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (
      disabled ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    if (
      event.key ===
      "Escape"
    ) {
      if (
        typeaheadQuery
      ) {
        event.preventDefault();
        event.stopPropagation();
        clearTypeahead();
        return;
      }

      setOpen(false);
      return;
    }

    if (
      event.key ===
      "Backspace"
    ) {
      if (
        !typeaheadQuery
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setTypeaheadQuery(
        (current) =>
          current.slice(
            0,
            -1,
          ),
      );

      setOpen(true);
      scheduleTypeaheadReset();
      return;
    }

    if (
      event.key.length !==
        1 ||
      event.key === "\n" ||
      event.key === "\r"
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    setTypeaheadQuery(
      (current) =>
        `${current}${event.key}`,
    );

    setOpen(true);
    scheduleTypeaheadReset();
  }

  return (
    <div
      ref={
        rootRef
      }
      onKeyDown={
        handleTypeaheadKeyDown
      }
      className="seasoncaddy-select"
    >
      <button
        type="button"
        disabled={
          disabled
        }
        onClick={() =>
          setOpen(
            (
              current,
            ) => {
              const next =
                !current;

              if (!next) {
                clearTypeahead();
              }

              return next;
            },
          )
        }
        className={`seasoncaddy-select-trigger ${
          open
            ? "seasoncaddy-select-trigger-open"
            : ""
        }`}
      >
        <span>
          {selected?.label ??
            placeholder}
        </span>

        <ChevronDown
          className={`size-4 transition-transform ${
            open
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {open &&
        !disabled && (
          <div className="seasoncaddy-select-menu">
            {filteredOptions.map(
              (
                option,
              ) => {
                const active =
                  option.value ===
                  value;

                return (
                  <button
                    key={
                      option.value
                    }
                    type="button"
                    onClick={() => {
                      onChange(
                        option.value,
                      );

                      setOpen(
                        false,
                      );

                      clearTypeahead();
                    }}
                    className={`seasoncaddy-select-option ${
                      active
                        ? "seasoncaddy-select-option-active"
                        : ""
                    }`}
                  >
                    {
                      option.label
                    }
                  </button>
                );
              },
            )}

            {filteredOptions.length ===
              0 && (
              <div className="seasoncaddy-select-empty">
                No matches
              </div>
            )}
          </div>
        )}
    </div>
  );
}
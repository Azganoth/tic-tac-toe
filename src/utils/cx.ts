export type ClassName =
  | string
  | Record<string, boolean | undefined | null>
  | undefined
  | null;

const isValidClassname = (className: ClassName) =>
  className !== undefined && className !== null;

export const cx = (...cx: ClassName[]): string =>
  cx
    .filter(isValidClassname)
    .map((classNames) =>
      typeof classNames === "string"
        ? classNames
        : Object.entries(classNames)
            .filter(
              ([className, condition]) =>
                isValidClassname(className) && condition,
            )
            .map(([className]) => className)
            .join(" "),
    )
    .filter((x) => x.length > 0)
    .join(" ");

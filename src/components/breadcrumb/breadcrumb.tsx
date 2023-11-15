import { useRouter } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { cn } from "@/helpers";

export type BreadcrumbProps = {
  props?: any;
  items: BreadcrumbItemProps[];
} & ComponentProps<"nav">;

export type BreadcrumbItemProps = {
  title: string;
  link?: string;
  active?: boolean;
  icon?: ReactNode;
};

export const Breadcrumb = ({
  items,
  className,
  ...props
}: BreadcrumbProps): JSX.Element => {
  const router = useRouter();
  return (
    <nav
      className={cn(
        "flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50",
        className
      )}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          return (
            <li className="inline-flex items-center" key={item.title}>
              <a
                onClick={() => {
                  if (item.link) router.push(item.link);
                }}
                className={cn(
                  "inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-800",
                  item.link && "cursor-pointer",
                  item.active && "text-blue-800"
                )}
              >
                <div className="flex gap-1">
                  {item.icon && (
                    <div className="mt-auto mb-auto">{item.icon}</div>
                  )}
                  {item.title}
                </div>
                {index === items.length - 1 ? null : (
                  <div className="ml-2">
                    <svg
                      className="w-3 h-3 mx-1 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </div>
                )}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

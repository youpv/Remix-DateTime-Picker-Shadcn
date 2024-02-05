import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function DateRangePicker({
  // eslint-disable-next-line react/prop-types
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 28),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL, y")} -{" "}
                  {format(date.to, "dd LLL, y")}
                </>
              ) : (
                format(date?.from, "dd LLL, y")
              )
            ) : (
              <span>Kies een datum</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// import * as React from "react";
// import { Form } from "@remix-run/react";
// import { useRemixForm, getValidatedFormData } from "remix-hook-form";
// import { DateRange } from "react-day-picker";
// import { addDays, format } from "date-fns";
// import { cn } from "~/lib/utils"; // Assuming this utility exists in your project
// import { Button } from "~/components/ui/button"; // Your Button component
// import { Calendar } from "~/components/ui/calendar"; // Your Calendar component
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "~/components/ui/popover"; // Your Popover components
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { json, ActionFunctionArgs } from "@remix-run/node";

// // Define your Zod schema for form validation
// const dateRangeSchema = z.object({
//   from: z.string(),
//   to: z.string(),
// });

// type FormData = z.infer<typeof dateRangeSchema>;

// const resolver = zodResolver(dateRangeSchema);

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const {
//     errors,
//     data,
//     receivedValues: defaultValues,
//   } = await getValidatedFormData<FormData>(request, resolver);
//   if (errors) {
//     // The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
//     return json({ errors, defaultValues });
//   }

//   // Do something with the data
//   return json(data);
// };

// export function DateRangePicker() {
//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: new Date(),
//     to: addDays(new Date(), 28),
//   });

//   const {
//     handleSubmit,
//     formState: { errors },
//     register,
//   } = useRemixForm<FormData>({
//     mode: "onSubmit",
//     resolver,
//   });

//   return (
//     <Form onSubmit={handleSubmit}>
//       <input
//         type="hidden"
//         {...register("from")}
//         value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
//       />

//       <input
//         type="hidden"
//         {...register("to")}
//         value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
//       />
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant="outline"
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "dd LLL, y")} -{" "}
//                   {format(date.to, "dd LLL, y")}
//                 </>
//               ) : (
//                 format(date?.from, "dd LLL, y")
//               )
//             ) : (
//               <span>Kies een datum</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//       {errors.from && <div>{errors.from.message}</div>}
//       {errors.to && <div>{errors.to.message}</div>}
//       <Button type="submit">Submit</Button>
//     </Form>
//   );
// }

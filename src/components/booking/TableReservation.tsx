import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

// Define validation schema with Zod
const reservationSchema = z.object({
  partySize: z.coerce.number().min(1, 'At least one guest is required').max(12, 'For parties larger than 12, please call us'),
  date: z.date().refine(d => !isBefore(d, startOfToday()), { message: 'Cannot book a date in the past' }),
  time: z.string().nonempty('Please select a time'),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

// Mock available time slots
const availableTimes = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];

const TableReservation: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<ReservationFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      partySize: 2,
      date: addDays(new Date(), 1),
      time: '7:00 PM',
    },
  });

  const selectedDate = watch('date');

  const onSubmit = (data: ReservationFormValues) => {
    console.log('Reservation submitted:', data);
    setSubmittedData(data);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900/50 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-neutral-800 dark:text-neutral-100">Reserve Your Table</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 font-inter">An unforgettable culinary experience awaits</p>
        </div>

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white/50 dark:bg-neutral-800/40 backdrop-blur-lg border border-white/20 dark:border-neutral-700/60 p-8 rounded-3xl shadow-xl space-y-8"
        >
          {/* Party Size */}
          <div>
            <label htmlFor="partySize" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 font-inter">Party Size</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input 
                id="partySize"
                type="number"
                {...register('partySize')}
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-neutral-700/50 border border-white/20 dark:border-neutral-600/60 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              />
            </div>
            {errors.partySize && <p className="text-red-500 text-sm mt-2">{errors.partySize.message}</p>}
          </div>

          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 font-inter">Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input 
                id="date"
                type="date"
                min={format(new Date(), 'yyyy-MM-dd')}
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={e => setValue('date', new Date(e.target.value), { shouldValidate: true })}
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-neutral-700/50 border border-white/20 dark:border-neutral-600/60 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition appearance-none"
              />
            </div>
            {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date.message}</p>}
          </div>

          {/* Time Selector */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 font-inter">Time</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {availableTimes.map(time => (
                <button 
                  key={time}
                  type="button"
                  onClick={() => setValue('time', time, { shouldValidate: true })}
                  className={`px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200 border ${watch('time') === time 
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                    : 'bg-white/50 dark:bg-neutral-700/50 border-white/20 dark:border-neutral-600/60 hover:bg-amber-500/10 hover:border-amber-500/30'}`}
                >
                  {time}
                </button>
              ))}
            </div>
            {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time.message}</p>}
          </div>

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-amber-500 text-white font-bold py-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors text-lg"
          >
            Book a Table
          </motion.button>
        </form>

        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-50" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl z-50 w-[90vw] max-w-md p-8 text-center">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <Dialog.Title className="text-2xl font-playfair font-bold text-neutral-800 dark:text-neutral-100">Reservation Confirmed!</Dialog.Title>
                {submittedData && (
                  <div className="mt-4 text-neutral-600 dark:text-neutral-300 font-inter space-y-2">
                    <p>Thank you for your reservation.</p>
                    <p><strong>Party Size:</strong> {submittedData.partySize}</p>
                    <p><strong>Date:</strong> {format(submittedData.date, 'EEEE, MMMM do, yyyy')}</p>
                    <p><strong>Time:</strong> {submittedData.time}</p>
                  </div>
                )}
                <Dialog.Close asChild>
                  <button className="mt-8 w-full bg-amber-500 text-white font-bold py-3 rounded-full hover:bg-amber-600 transition-colors">
                    Done
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default TableReservation;

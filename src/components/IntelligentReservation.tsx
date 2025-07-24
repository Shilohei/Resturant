import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAIReservation } from '@/hooks/useAI';
import { ReservationRequest, ReservationResponse } from '@/types/ai.types';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Info
} from 'lucide-react';

export const IntelligentReservation: React.FC = () => {
  const [request, setRequest] = useState<ReservationRequest>({
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    partySize: 2,
    preferences: [],
    specialRequests: ''
  });

  const { mutate: makeReservation, isPending, data: reservationResponse, error } = useAIReservation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest(prev => ({ ...prev, [name]: value }));
  };

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest(prev => ({ ...prev, partySize: parseInt(e.target.value) || 1 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    makeReservation(request);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="h-6 w-6" />
            Intelligent Reservation System
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={request.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  Time
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={request.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="partySize" className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                Party Size
              </Label>
              <Input
                id="partySize"
                name="partySize"
                type="number"
                min="1"
                max="20"
                value={request.partySize}
                onChange={handlePartySizeChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="specialRequests" className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4" />
                Special Requests
              </Label>
              <Input
                id="specialRequests"
                name="specialRequests"
                placeholder="e.g., Window seat, birthday celebration"
                value={request.specialRequests}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Checking Availability...
                </>
              ) : (
                'Book a Table'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700">Error: {error.message}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {reservationResponse && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <ReservationResult response={reservationResponse} />
        </motion.div>
      )}
    </div>
  );
};

interface ReservationResultProps {
  response: ReservationResponse;
}

const ReservationResult: React.FC<ReservationResultProps> = ({ response }) => {
  const isConfirmed = response.status === 'confirmed';

  return (
    <Card className={isConfirmed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-3 text-xl ${isConfirmed ? 'text-green-800' : 'text-yellow-800'}`}>
          {isConfirmed ? <CheckCircle className="h-6 w-6" /> : <Info className="h-6 w-6" />}
          Reservation {isConfirmed ? 'Confirmed' : 'Waitlisted'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConfirmed ? (
          <div className="space-y-2">
            <p><strong>Table Number:</strong> {response.tableNumber}</p>
            <p>Your table is reserved! We look forward to seeing you.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Estimated Wait Time:</strong> {response.estimatedWaitTime} minutes</p>
            <p>We are currently fully booked at your requested time. You have been added to the waitlist.</p>
          </div>
        )}

        {response.dynamicPrice && (
          <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800">Dynamic Reservation Fee</p>
              <p className="text-sm text-blue-700">A fee of ${response.dynamicPrice.toFixed(2)} applies for this premium time slot.</p>
            </div>
          </div>
        )}

        {response.alternatives && response.alternatives.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Alternative Times:</h4>
            <div className="flex flex-wrap gap-2">
              {response.alternatives.map((alt, index) => (
                <Button key={index} variant="outline" size="sm">
                  {alt.time} (+${alt.price.toFixed(2)})
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Info } from "lucide-react";
import { Game } from "../stores/gameStore";

type GameDetailsModalProps = {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
};

export default function GameDetailsModal({
  game,
  isOpen,
  onClose,
  onJoin,
}: GameDetailsModalProps) {
  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{game.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-gray-100">
              {game.sport}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-gray-600">{game.location}</p>
            </div>
          </div>
          
          {game.date && (
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{game.date}</p>
              </div>
            </div>
          )}
          
          {game.time && (
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-gray-600">{game.time}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Maximum Players</p>
              <p className="text-gray-600">{game.maxPlayers}</p>
            </div>
          </div>
          
          {game.details && (
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Details</p>
                <p className="text-gray-600 whitespace-pre-wrap">{game.details}</p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onJoin}>
            Join Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
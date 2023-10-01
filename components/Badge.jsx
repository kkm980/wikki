import { Badge } from "@/components/ui/badge";

export default function BadgeDestructive({text, onClick}) {
  return <Badge variant="destructive" onClick={()=>{onClick()}}>{text}</Badge>
}

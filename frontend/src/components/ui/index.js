import { Input } from "./input";
import { Button } from "./button";
import { Label } from "./label";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const UserAvatar = ({ src, ...props }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export { Input, Button, Label, UserAvatar };

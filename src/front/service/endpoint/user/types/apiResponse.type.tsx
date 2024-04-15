import { Link } from "./link.type"
import { User } from "./user.type"

export type ApiResponse = {
    users: User[];
    links: Link[];
    count: number;
}
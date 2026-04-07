import { ICommitInfo } from "./commit-info.interface"

export interface IProgrammerData {
    id: number
    name: string
    username: string
    avatar_url: URL

    commits: ICommitInfo[]
}
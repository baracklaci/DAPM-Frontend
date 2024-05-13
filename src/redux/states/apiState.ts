export interface ApiState {
    organizations: Organization[],
    repositories: Repository[],
    resources: Resource[]
}

export interface Organization {
    name: string,
    id: number
    apiUrl: string
}

export interface Repository {
    id: number,
    name: string,
    organizationId: number

}

export interface Resource {
    id: number,
    name: string,
    organizationId: number,
    repositoryId: number,
    type: string

}
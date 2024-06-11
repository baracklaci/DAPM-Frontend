export interface ApiState {
    organizations: Organization[],
    repositories: Repository[],
    resources: Resource[]
}

export interface Organization {
    name: string,
    id: string
    apiUrl: string
}

export interface Repository {
    id: string,
    name: string,
    organizationId: string

}

export interface Resource {
    id: string,
    name: string,
    organizationId: string,
    repositoryId: string,
    type: string

}
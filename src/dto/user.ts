export interface UserCreateDto {
  username: string
  password: string
  name: string
  email: string
}

export interface UserDTO {
  id_user: number
  username: string
  password: string
  name: string
  email: string
}

export interface UserUpdateDto {
  username: string
  name: string
  email: string
}
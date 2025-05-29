export interface Category {
  _id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

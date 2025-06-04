export interface Category {
  _id: string;
  name: string;
  description?: string;
  image_url?: string;
  deleted_at?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  image_url?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

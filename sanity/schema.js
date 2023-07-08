import article from "./schemas/article"
import category from "./schemas/category"
import subcategory from "./schemas/subcategory"
import tag from "./schemas/tag"
import user from "./schemas/user"

export const schema = {
  types: [article, category, subcategory, tag, user],
}

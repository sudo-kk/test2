import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Category } from "@shared/schema";

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters."
  }).regex(/^[a-z0-9-]+$/, {
    message: "Slug must contain only lowercase letters, numbers, and hyphens."
  }),
});

export default function CategoryForm({ category, onSubmit, isLoading }: CategoryFormProps) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ? {
      name: category.name,
      slug: category.slug,
    } : {
      name: "",
      slug: "",
    },
  });

  // Generate slug from name
  const watchName = form.watch("name");
  
  const generateSlug = () => {
    const slug = watchName
      .toLowerCase()
      .replace(/\s+/g, '-')    // Replace spaces with hyphens
      .replace(/[^\w-]+/g, '') // Remove non-word chars
      .replace(/--+/g, '-')    // Replace multiple hyphens with single hyphen
      .replace(/^-+/, '')      // Trim hyphens from start
      .replace(/-+$/, '');     // Trim hyphens from end
    
    form.setValue("slug", slug);
  };

  function handleSubmit(values: z.infer<typeof categorySchema>) {
    // If editing, include the category ID
    onSubmit(category ? { id: category.id, ...values } : values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Watches" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input placeholder="watches" {...field} />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateSlug}
                >
                  Generate
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Used in URLs: example.com/category/[slug]
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {category ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{category ? "Update Category" : "Add Category"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
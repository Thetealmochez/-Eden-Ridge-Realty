
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size_sqft: number;
  property_type: string;
  description: string;
  is_featured: boolean;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    size_sqft: "",
    property_type: "Residential",
    description: "",
    is_featured: false,
  });

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch all properties from Supabase
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setProperties(data);
      }
    } catch (error: any) {
      console.error("Error fetching properties:", error.message);
      toast({
        title: "Failed to load properties",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select input changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Reset form to empty values
  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      size_sqft: "",
      property_type: "Residential",
      description: "",
      is_featured: false,
    });
    setIsEditing(false);
    setCurrentProperty(null);
  };

  // Set form data for editing a property
  const handleEditProperty = (property: Property) => {
    setCurrentProperty(property);
    setFormData({
      title: property.title || "",
      price: property.price?.toString() || "",
      location: property.location || "",
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      size_sqft: property.size_sqft?.toString() || "",
      property_type: property.property_type || "Residential",
      description: property.description || "",
      is_featured: property.is_featured || false,
    });
    setIsEditing(true);
    
    // Scroll to form
    document.getElementById("property-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.price || !formData.location) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const propertyData = {
        title: formData.title,
        price: parseFloat(formData.price),
        location: formData.location,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : null,
        size_sqft: formData.size_sqft ? parseInt(formData.size_sqft) : null,
        property_type: formData.property_type,
        description: formData.description,
        is_featured: formData.is_featured,
      };
      
      if (isEditing && currentProperty) {
        // Update existing property
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", currentProperty.id);
          
        if (error) throw error;
        
        toast({
          title: "Property Updated",
          description: "The property has been successfully updated.",
        });
      } else {
        // Create new property
        const { error } = await supabase
          .from("properties")
          .insert([propertyData]);
          
        if (error) throw error;
        
        toast({
          title: "Property Created",
          description: "The property has been successfully created.",
        });
      }
      
      // Reset form and refetch properties
      resetForm();
      fetchProperties();
    } catch (error: any) {
      console.error("Error submitting property:", error.message);
      toast({
        title: "Operation Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle property deletion
  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast({
        title: "Property Deleted",
        description: "The property has been successfully deleted.",
      });
      
      // If deleting the property currently being edited, reset the form
      if (currentProperty && currentProperty.id === id) {
        resetForm();
      }
      
      // Refetch properties
      fetchProperties();
    } catch (error: any) {
      console.error("Error deleting property:", error.message);
      toast({
        title: "Delete Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-luxury-navy">Admin Dashboard</h1>
                <p className="text-luxury-slate">Manage your property listings</p>
              </div>
              <Button
                onClick={resetForm}
                className="mt-4 md:mt-0 bg-luxury-navy hover:bg-luxury-navy/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </div>

            {/* Property Form */}
            <div
              id="property-form"
              className="bg-white p-6 rounded-lg shadow-lg mb-10"
            >
              <h2 className="text-xl font-semibold text-luxury-navy mb-6">
                {isEditing ? "Edit Property" : "Add New Property"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Luxury Villa in Karen"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price (KSh) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="85000000"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Karen, Nairobi"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      placeholder="4"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      step="0.5"
                      placeholder="3.5"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="size_sqft">Size (sq ft)</Label>
                    <Input
                      id="size_sqft"
                      name="size_sqft"
                      type="number"
                      placeholder="2500"
                      value={formData.size_sqft}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property_type">Property Type</Label>
                    <Select
                      value={formData.property_type}
                      onValueChange={(value) =>
                        handleSelectChange("property_type", value)
                      }
                    >
                      <SelectTrigger id="property_type">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_featured"
                      name="is_featured"
                      checked={formData.is_featured}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-luxury-navy focus:ring-luxury-gold border-gray-300 rounded"
                    />
                    <Label htmlFor="is_featured" className="cursor-pointer">
                      Feature this property
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter property description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-luxury-navy hover:bg-luxury-navy/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : isEditing ? (
                      "Update Property"
                    ) : (
                      "Save Property"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Properties List */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-luxury-navy mb-6">
                All Properties
              </h2>

              {loading ? (
                <div className="py-20 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-luxury-navy mx-auto" />
                  <p className="mt-4 text-luxury-slate">Loading properties...</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-luxury-slate">No properties found.</p>
                  <Button
                    onClick={resetForm}
                    className="mt-4 bg-luxury-navy hover:bg-luxury-navy/90"
                  >
                    Add Your First Property
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price (KSh)</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">
                            {property.title || "Untitled Property"}
                          </TableCell>
                          <TableCell>{property.location || "N/A"}</TableCell>
                          <TableCell>
                            {property.price
                              ? property.price.toLocaleString()
                              : "N/A"}
                          </TableCell>
                          <TableCell>{property.property_type || "N/A"}</TableCell>
                          <TableCell>
                            {property.is_featured ? "Yes" : "No"}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProperty(property)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;

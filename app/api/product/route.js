import { product } from "../../../backend/lib/product";

export const GET = () => {
  return Response.json({ status: "Success", data: product });
};

export const POST = async (req) => {
  const data = await req.json();

  if (!data.name) {
    return Response.json({ status: "Failed", message: "Name is required" },
        { status: 400 });
  }

  const newProduct = { id: product.length + 1, ...data };
  product.push(newProduct);

  return Response.json({ status: "Created", data: product }, 
    { status: 201 });
};

export const PUT = async (req) => {
  const data = await req.json();
  const index = product.findIndex(p => p.id === data.id);

  if (index === -1) {
    return Response.json({ status: "Not Found", message: "Invalid ID" },
        { status: 404 });
  }

  product[index] = { ...product[index], ...data };
  return Response.json({ status: "Updated", data: product[index] });
};

export const DELETE = (req) => {
  const id = parseInt(new URL(req.url).searchParams.get("id"));
  const index = product.findIndex(p => p.id === id);

  if (index === -1) {
    return Response.json({ status: "Not Found", message: "Invalid ID" },
        { status: 404 });
  }

  const deleted = product.splice(index, 1)[0];
  return Response.json({ status: "Deleted", data: deleted });
};



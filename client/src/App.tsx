import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ProductPage from "@/pages/product-page";
import CategoryPage from "@/pages/category-page";
import CartPage from "@/pages/cart-page";
import CheckoutPage from "@/pages/checkout-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminOrders from "@/pages/admin/orders";
import { CartProvider } from "./context/cart-context";
import { CurrencyProvider } from "./context/currency-context";
import Navbar from "./components/layout/navbar-new";
import Footer from "./components/layout/footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/products/:id" component={ProductPage} />
      <Route path="/categories/:slug" component={CategoryPage} />
      <Route path="/cart" component={CartPage} />
      <ProtectedRoute path="/checkout" component={CheckoutPage} adminRequired={false} />
      <ProtectedRoute path="/admin" component={AdminDashboard} adminRequired={true} />
      <ProtectedRoute path="/admin/products" component={AdminProducts} adminRequired={true} />
      <ProtectedRoute path="/admin/orders" component={AdminOrders} adminRequired={true} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <CurrencyProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </CurrencyProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

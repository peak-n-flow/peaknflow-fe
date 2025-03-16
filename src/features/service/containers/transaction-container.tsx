"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MIDTRANS_APP_URL, MIDTRANS_CLIENT_KEY } from "@/lib/env";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function TransactionContainer({
  snapToken,
}: {
  snapToken: string;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${MIDTRANS_APP_URL}snap/snap.js`;
    script.setAttribute("data-client-key", `SB-${MIDTRANS_CLIENT_KEY}`);
    script.onload = () => {
      setIsLoading(false);
    };
    script.onerror = () => {
      setError("Failed to load payment gateway");
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      // Clean up
      document.body.removeChild(script);
    };
  }, []);

  const handlePayNow = () => {
    if (window.snap && snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: (result: any) => {
          toast.success("Payment successful");
        },
        onPending: (result: any) => {
          toast.success("Payment pending");
        },
        onError: (result: any) => {
          toast.error("Payment failed");
        },
        onClose: () => {
          console.log(
            "Customer closed the payment popup without completing payment"
          );
        },
      });
    } else {
      setError("Payment gateway not available");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>
            Secure payment processing by Midtrans
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md bg-destructive/15 p-3 text-destructive">
              {error}
            </div>
          )}

          {!snapToken && (
            <div className="mb-4 rounded-md bg-amber-100 p-3 text-amber-800">
              No payment token found. Please return to checkout.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handlePayNow}
            disabled={isLoading || !snapToken || !!error}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading payment gateway...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

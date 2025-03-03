import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

//Redeploy every time you update this edge function

const url = Deno.env.get("SUPABASE_URL") || "";
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(url, key);

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Read request body as text
    const bodyText = await req.text();

    // Convert form-urlencoded string to an object
    const params = new URLSearchParams(bodyText);

    const messageId = params.get("id");
    const status = params.get("status");
    const network_code = params.get("networkCode");
    const failure_reason = params.get("failureReason");
    const retry_count = params.get("retryCount");

    // Insert delivery report into Supabase
    const { error } = await supabase
      .from('reports')
      .update({
        delivery_status: status,
        network_code: network_code,
        failure_reason: failure_reason,
        retry_count: retry_count,      
      })
      .eq("messageId", messageId);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return new Response(`Error saving data: ${error.message}`, { status: 500 });
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing delivery reports:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});


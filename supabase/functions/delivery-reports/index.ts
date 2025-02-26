import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";


//Redeploy every time you update this edge function
serve(async (req) => {
    try {
        // Get Supabase environment variables
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") || "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
        );

        // Parse the request body
        const body = await req.json();

        // Ensure required fields exist
        if (!body.status || !body.phoneNumber) {
            return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });
        }

        // Insert or update the delivery report in Supabase
        const { error } = await supabase
            .from("reports")
            .upsert([
                {
                    // id: body.id,
                    status: body.status,
                    mobile: body.phoneNumber,
                    network_code: body.networkCode,
                    failure_reason: body.failureReason || null,
                    retry_count: Number(body.retryCount) || 0,
                    message_id: body.messageId,
                    received_at: new Date().toISOString(), // Store timestamp
                }
            ], { onConflict: "id" });

        if (error) throw error;

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("Error processing delivery report:", (err as Error).message);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("OrderModal", () => {
  const retiredPlatformPattern = new RegExp("to" + "ast", "i");
  const retiredPlatformDomainPattern = new RegExp("to" + "asttab\\.com", "i");
  const source = readFileSync(
    join(process.cwd(), "src", "app", "components", "OrderModal.tsx"),
    "utf8",
  );

  it("does not show the retired direct ordering platform", () => {
    assert.doesNotMatch(source, retiredPlatformPattern);
    assert.doesNotMatch(source, retiredPlatformDomainPattern);
  });

  it("tracks outbound delivery orders from the Napoli website", () => {
    assert.match(
      source,
      /https:\/\/www\.ubereats\.com\/store\/napoli-pizzeria-taft-rd\/-rMPBrC3UmazDQBghIZzug\?[^"]*utm_source=napoli_website[^"]*utm_medium=referral[^"]*utm_campaign=order_online/,
    );
    assert.match(
      source,
      /https:\/\/www\.doordash\.com\/store\/napoli-pizzeria-syracuse-31031912\/109548190\/\?[^"]*utm_source=napoli_website[^"]*utm_medium=referral[^"]*utm_campaign=order_online/,
    );
  });
});

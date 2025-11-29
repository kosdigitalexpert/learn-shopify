# How to Set Up Low Stock Inventory Reminder Emails

📖 Article: [How to Set Up Low Stock Inventory Reminder Emails](https://digital-expert.co.uk/blogs/product-management/low-stock-inventory-reminder-emails)

## 🚀Step-by-Step Setup Instructions
### Copy & paste into the Subject field
```liquid
   Low Stock Alert: {{ product.title }} {% unless productVariant.title == 'Default Title' %}– {{ productVariant.title }}{% endunless %} ({% if productVariant.inventoryQuantity > 0 %}Only {{ productVariant.inventoryQuantity }} left!{% else %}Out of Stock{% endif %})
```

### Copy & paste into the Message field
```liquid
<div
    style="font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08);">

    <!-- ==================== EMAIL HEADER ==================== -->
    <div style="background:#0f172a;color:#ffffff;padding:32px 24px;text-align:center;">
        <h1 style="margin:0;font-size:30px;font-weight:800;letter-spacing:-0.5px;">Stock Alert</h1>
        <p style="margin:12px 0 0;font-size:22px;opacity:0.95;">
            {% if productVariant.inventoryQuantity > 0 %}
            Only <strong style="font-size:22px;font-weight:900;">{{ productVariant.inventoryQuantity }}</strong> unit{%
            if productVariant.inventoryQuantity > 1 %}s{% endif %} left
            {% else %}
            <strong style="font-size:22px;font-weight:900;color:#fca5a5;">Out of Stock</strong>
            {% endif %}
        </p>
    </div>

    <!-- ==================== MAIN CONTENT AREA ==================== -->
    <div style="padding:36px 28px;color:#1e293b;background:#ffffff;">

        <!-- Product Image + Details Table -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
                <!-- ==================== PRODUCT IMAGE COLUMN ==================== -->
                <td style="padding-right:28px;vertical-align:top;">
                    <div
                        style="width:156px;height:auto;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:16px;overflow:hidden;line-height:0;font-size:0;">
                        <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="width:156px;height:156px;" arcsize="10%" stroke="f" fillcolor="#f8fafc">
                <v:textbox inset="0,0,0,0"><center>
                <![endif]-->
                        <img src="{{product.featuredMedia.preview.image.url }}" alt="{{ product.title }}" width="156"
                            style="display:block;border:0;outline:none;width:156px;height:auto;" />
                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                    </div>
                </td>

                <!-- ==================== PRODUCT INFORMATION COLUMN ==================== -->
                <td style="vertical-align:top;">
                    <!-- Product Title -->
                    <h2 style="margin:0 0 10px;font-size:26px;font-weight:700;color:#0f172a;line-height:1.2;">
                        {{ product.title }}
                    </h2>

                    <!-- Variant Name (hidden if "Default Title") -->
                    {% unless productVariant.title == 'Default Title' %}
                    <p style="margin:0 0 16px;font-size:18px;color:#475569;">
                        <strong style="color:#1e293b;">Variant:</strong> {{ productVariant.title }}
                    </p>
                    {% endunless %}

                    <!-- Key Details Table -->
                    <table style="font-size:16px;color:#334155;line-height:1.7;">
                        <tr>
                            <td style="padding-bottom:6px;"><strong>SKU</strong></td>
                            <td style="padding-left:20px;padding-bottom:6px;">{{ productVariant.sku | default: "—" }}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-bottom:6px;"><strong>Vendor</strong></td>
                            <td style="padding-left:20px;padding-bottom:6px;">{{ product.vendor }}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom:6px;"><strong>Current Stock</strong></td>
                            <td
                                style="padding-left:20px;padding-bottom:6px;font-size:24px;font-weight:800;color:#dc2626;">
                                {{ productVariant.inventoryQuantity }}</td>
                        </tr>
                    </table>

                    <!-- Critical Stock Warning (appears when ≤5 units) -->
                    {% if productVariant.inventoryQuantity <= 5 %} 
                    <div
                        style="margin-top:20px;padding:12px 16px;background:#fef2f2;border:1px solid #fca5a5;border-radius:12px;display:inline-block;">
                        <strong style="color:#dc2626;font-size:15px;">Critical Stock Level</strong>
                    </div>
                    {% endif %}
                </td>
            </tr>
        </table>

        <!-- ==================== CALL-TO-ACTION BUTTON ==================== -->
        <div style="text-align:center;margin:36px 0 8px;">
            <a href="{{ shop.url }}/admin/products/{{ product.id | split: '/' | last }}"
                style="display:inline-block;background:#0f172a;color:#ffffff;padding:16px 40px;border-radius:50px;text-decoration:none;font-weight:700;font-size:17px;letter-spacing:0.3px;box-shadow:0 8px 20px rgba(15,23,42,0.2);">
                Open Product in Shopify Admin
            </a>
        </div>

    </div>

    <!-- ==================== EMAIL FOOTER ==================== -->
    <div
        style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px;text-align:center;font-size:13px;color:#64748b;">
        <p style="margin:0;">
            {{ shop.name }} • {{ 'now' | date: '%B %d, %Y at %l:%M %p' }}
        </p>
    </div>
</div>
```

---

## ⚠️ Important Disclaimer
This code helps store owners improve their Shopify stores. However, I am **not responsible** for any issues, downtime, lost sales, or damage. Always:
- Test on a **development theme/store first**
- **Backup your live theme** before applying changes
- Contact a **developer** if you need help

## ☕ Support
Liked this code? [Buy me a coffee](https://buymeacoffee.com/kosdigital) ☕
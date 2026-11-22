# CHAMBAAGO — prueba aislada de comisión automática

## Alcance y seguridad
Esta prueba vive en la rama `test/automatic-commission-ledger` de
`chambaago-marketplace-starter`. No modifica Macaly, el sitio publicado,
la base de datos real, Railway, pagos reales ni ramas de producción.

El repositorio base es un starter mínimo de API Node.js, no el código del panel
administrativo de CHAMBAAGO. Esta prueba valida solo cálculo y resumen; no integra
el panel ni una pasarela de pago.

## Regla
- Solo el estado interno `confirmed` genera comisión.
- `pending` y `submitted` se cuentan como pendientes y generan S/0.
- CHAMBAAGO recibe 10%; el profesional recibe el remanente (90%).
- Se usan céntimos enteros; la comisión se redondea al céntimo más cercano y el
  profesional recibe el remanente para conservar el total exacto.
- IDs confirmados duplicados se rechazan.
- Rechazados, reembolsados y cancelados no se suman como ganancias.

## Ejemplo
Pago confirmado de S/100.00: bruto S/100.00, CHAMBAAGO S/10.00,
profesional S/90.00.

## Ejecutar pruebas
Node.js 20+: `node --test`.

## Límite
No demuestra que el dinero haya llegado a Yape o al banco y no realiza
transferencias. En producción, el estado confirmado debe proceder de una fuente
verificada del lado del servidor, nunca del navegador. La integración real
requiere enlazar esta regla al libro de pagos, autenticación, auditoría,
reembolsos y proveedor de pago.

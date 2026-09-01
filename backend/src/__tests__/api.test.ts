import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config/env";

describe("Backend Core Logic & Security Tests", () => {
    it("should hash and verify passwords with bcrypt correctly", async () => {
        const password = "mySecretPassword123!";
        const hash = await bcrypt.hash(password, 10);

        expect(hash).not.toBe(password);
        const isMatch = await bcrypt.compare(password, hash);
        expect(isMatch).toBe(true);

        const isWrong = await bcrypt.compare("wrongPassword", hash);
        expect(isWrong).toBe(false);
    });

    it("should correctly sign and verify JWT tokens", () => {
        const payload = {
            id: 42,
            email: "client@chatbit.com",
            role: "CLIENT"
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        expect(typeof token).toBe("string");

        const decoded = jwt.verify(token, JWT_SECRET) as any;
        expect(decoded.id).toBe(42);
        expect(decoded.email).toBe("client@chatbit.com");
        expect(decoded.role).toBe("CLIENT");
    });

    it("should reject an invalid or tampered JWT token", () => {
        const token = jwt.sign({ id: 1 }, JWT_SECRET);
        const tamperedToken = token + "bad";

        expect(() => {
            jwt.verify(tamperedToken, JWT_SECRET);
        }).toThrow();
    });

    it("should normalize roles and emails properly", () => {
        const email = "  User.Name@Domain.COM  ";
        const role = "client";

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedRole = role.toUpperCase();

        expect(normalizedEmail).toBe("user.name@domain.com");
        expect(normalizedRole).toBe("CLIENT");
    });
});

/* eslint-disable no-undef */
import { expect } from 'chai';

// Function for CPF validation
function validateCPF(value) {
  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfPattern.test(value);
}

// Function for CEP validation
function validateCEP(value) {
  const cepPattern = /^\d{8}$/;
  return cepPattern.test(value);
}

// Function for card number formatting
function formatCardNumber(cardNumber) {
  let cleaned = cardNumber.replace(/\D/g, '').slice(0, 16);
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
}

// Unit tests for the functions
describe('Utility Functions', () => {
  describe('validateCPF', () => {
    it('should return true for a valid CPF', () => {
      const cpf = '123.456.789-09';
      expect(validateCPF(cpf)).to.be.true;
    });

    it('should return false for an invalid CPF', () => {
      const cpf = '123.456.789';
      expect(validateCPF(cpf)).to.be.false;
    });
  });

  describe('validateCEP', () => {
    it('should return true for a valid CEP', () => {
      const cep = '12345678';
      expect(validateCEP(cep)).to.be.true;
    });

    it('should return false for an invalid CEP', () => {
      const cep = '123456';
      expect(validateCEP(cep)).to.be.false;
    });
  });

  describe('formatCardNumber', () => {
    it('should format card number correctly', () => {
      const cardNumber = '1234123412341234';
      expect(formatCardNumber(cardNumber)).to.equal('1234 1234 1234 1234');
    });

    it('should handle card numbers with spaces', () => {
      const cardNumber = '1234 1234 1234 1234';
      expect(formatCardNumber(cardNumber)).to.equal('1234 1234 1234 1234');
    });
  });
});

/**
 * Autogenerated by Avro
 *
 * DO NOT EDIT DIRECTLY
 */
package br.com.maidahealth.telemedapi.avro;

import org.apache.avro.specific.SpecificData;
import org.apache.avro.message.BinaryMessageEncoder;
import org.apache.avro.message.BinaryMessageDecoder;
import org.apache.avro.message.SchemaStore;

@org.apache.avro.specific.AvroGenerated
public class AddParticipantRequest extends org.apache.avro.specific.SpecificRecordBase {
  private static final long serialVersionUID = 2424323331620606149L;


  public static final org.apache.avro.Schema SCHEMA$ = new org.apache.avro.Schema.Parser().parse("{\"type\":\"record\",\"name\":\"AddParticipantRequest\",\"fields\":[{\"name\":\"api_key\",\"type\":{\"type\":\"string\",\"avro.java.string\":\"String\"},\"avro.java.string\":\"String\"},{\"name\":\"chat_id\",\"type\":{\"type\":\"string\",\"avro.java.string\":\"String\"},\"avro.java.string\":\"String\"},{\"name\":\"participant_uuids\",\"type\":{\"type\":\"array\",\"items\":{\"type\":\"string\",\"avro.java.string\":\"String\"},\"avro.java.string\":\"String\"}}]}");
  public static org.apache.avro.Schema getClassSchema() { return SCHEMA$; }

  private static final SpecificData MODEL$ = new SpecificData();

  private static final BinaryMessageEncoder<AddParticipantRequest> ENCODER =
      new BinaryMessageEncoder<AddParticipantRequest>(MODEL$, SCHEMA$);

  private static final BinaryMessageDecoder<AddParticipantRequest> DECODER =
      new BinaryMessageDecoder<AddParticipantRequest>(MODEL$, SCHEMA$);

  /**
   * Return the BinaryMessageEncoder instance used by this class.
   * @return the message encoder used by this class
   */
  public static BinaryMessageEncoder<AddParticipantRequest> getEncoder() {
    return ENCODER;
  }

  /**
   * Return the BinaryMessageDecoder instance used by this class.
   * @return the message decoder used by this class
   */
  public static BinaryMessageDecoder<AddParticipantRequest> getDecoder() {
    return DECODER;
  }

  /**
   * Create a new BinaryMessageDecoder instance for this class that uses the specified {@link SchemaStore}.
   * @param resolver a {@link SchemaStore} used to find schemas by fingerprint
   * @return a BinaryMessageDecoder instance for this class backed by the given SchemaStore
   */
  public static BinaryMessageDecoder<AddParticipantRequest> createDecoder(SchemaStore resolver) {
    return new BinaryMessageDecoder<AddParticipantRequest>(MODEL$, SCHEMA$, resolver);
  }

  /**
   * Serializes this AddParticipantRequest to a ByteBuffer.
   * @return a buffer holding the serialized data for this instance
   * @throws java.io.IOException if this instance could not be serialized
   */
  public java.nio.ByteBuffer toByteBuffer() throws java.io.IOException {
    return ENCODER.encode(this);
  }

  /**
   * Deserializes a AddParticipantRequest from a ByteBuffer.
   * @param b a byte buffer holding serialized data for an instance of this class
   * @return a AddParticipantRequest instance decoded from the given buffer
   * @throws java.io.IOException if the given bytes could not be deserialized into an instance of this class
   */
  public static AddParticipantRequest fromByteBuffer(
      java.nio.ByteBuffer b) throws java.io.IOException {
    return DECODER.decode(b);
  }

  private java.lang.String api_key;
  private java.lang.String chat_id;
  private java.util.List<java.lang.String> participant_uuids;

  /**
   * Default constructor.  Note that this does not initialize fields
   * to their default values from the schema.  If that is desired then
   * one should use <code>newBuilder()</code>.
   */
  public AddParticipantRequest() {}

  /**
   * All-args constructor.
   * @param api_key The new value for api_key
   * @param chat_id The new value for chat_id
   * @param participant_uuids The new value for participant_uuids
   */
  public AddParticipantRequest(java.lang.String api_key, java.lang.String chat_id, java.util.List<java.lang.String> participant_uuids) {
    this.api_key = api_key;
    this.chat_id = chat_id;
    this.participant_uuids = participant_uuids;
  }

  public org.apache.avro.specific.SpecificData getSpecificData() { return MODEL$; }
  public org.apache.avro.Schema getSchema() { return SCHEMA$; }
  // Used by DatumWriter.  Applications should not call.
  public java.lang.Object get(int field$) {
    switch (field$) {
    case 0: return api_key;
    case 1: return chat_id;
    case 2: return participant_uuids;
    default: throw new IndexOutOfBoundsException("Invalid index: " + field$);
    }
  }

  // Used by DatumReader.  Applications should not call.
  @SuppressWarnings(value="unchecked")
  public void put(int field$, java.lang.Object value$) {
    switch (field$) {
    case 0: api_key = value$ != null ? value$.toString() : null; break;
    case 1: chat_id = value$ != null ? value$.toString() : null; break;
    case 2: participant_uuids = (java.util.List<java.lang.String>)value$; break;
    default: throw new IndexOutOfBoundsException("Invalid index: " + field$);
    }
  }

  /**
   * Gets the value of the 'api_key' field.
   * @return The value of the 'api_key' field.
   */
  public java.lang.String getApiKey() {
    return api_key;
  }


  /**
   * Sets the value of the 'api_key' field.
   * @param value the value to set.
   */
  public void setApiKey(java.lang.String value) {
    this.api_key = value;
  }

  /**
   * Gets the value of the 'chat_id' field.
   * @return The value of the 'chat_id' field.
   */
  public java.lang.String getChatId() {
    return chat_id;
  }


  /**
   * Sets the value of the 'chat_id' field.
   * @param value the value to set.
   */
  public void setChatId(java.lang.String value) {
    this.chat_id = value;
  }

  /**
   * Gets the value of the 'participant_uuids' field.
   * @return The value of the 'participant_uuids' field.
   */
  public java.util.List<java.lang.String> getParticipantUuids() {
    return participant_uuids;
  }


  /**
   * Sets the value of the 'participant_uuids' field.
   * @param value the value to set.
   */
  public void setParticipantUuids(java.util.List<java.lang.String> value) {
    this.participant_uuids = value;
  }

  /**
   * Creates a new AddParticipantRequest RecordBuilder.
   * @return A new AddParticipantRequest RecordBuilder
   */
  public static br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder newBuilder() {
    return new br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder();
  }

  /**
   * Creates a new AddParticipantRequest RecordBuilder by copying an existing Builder.
   * @param other The existing builder to copy.
   * @return A new AddParticipantRequest RecordBuilder
   */
  public static br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder newBuilder(br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder other) {
    if (other == null) {
      return new br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder();
    } else {
      return new br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder(other);
    }
  }

  /**
   * Creates a new AddParticipantRequest RecordBuilder by copying an existing AddParticipantRequest instance.
   * @param other The existing instance to copy.
   * @return A new AddParticipantRequest RecordBuilder
   */
  public static br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder newBuilder(br.com.maidahealth.telemedapi.avro.AddParticipantRequest other) {
    if (other == null) {
      return new br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder();
    } else {
      return new br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder(other);
    }
  }

  /**
   * RecordBuilder for AddParticipantRequest instances.
   */
  @org.apache.avro.specific.AvroGenerated
  public static class Builder extends org.apache.avro.specific.SpecificRecordBuilderBase<AddParticipantRequest> {

    private java.lang.String api_key;
    private java.lang.String chat_id;
    private java.util.List<java.lang.String> participant_uuids;

    /** Creates a new Builder */
    private Builder() {
      super(SCHEMA$, MODEL$);
    }

    /**
     * Creates a Builder by copying an existing Builder.
     * @param other The existing Builder to copy.
     */
    private Builder(br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder other) {
      super(other);
      if (isValidValue(fields()[0], other.api_key)) {
        this.api_key = data().deepCopy(fields()[0].schema(), other.api_key);
        fieldSetFlags()[0] = other.fieldSetFlags()[0];
      }
      if (isValidValue(fields()[1], other.chat_id)) {
        this.chat_id = data().deepCopy(fields()[1].schema(), other.chat_id);
        fieldSetFlags()[1] = other.fieldSetFlags()[1];
      }
      if (isValidValue(fields()[2], other.participant_uuids)) {
        this.participant_uuids = data().deepCopy(fields()[2].schema(), other.participant_uuids);
        fieldSetFlags()[2] = other.fieldSetFlags()[2];
      }
    }

    /**
     * Creates a Builder by copying an existing AddParticipantRequest instance
     * @param other The existing instance to copy.
     */
    private Builder(br.com.maidahealth.telemedapi.avro.AddParticipantRequest other) {
      super(SCHEMA$, MODEL$);
      if (isValidValue(fields()[0], other.api_key)) {
        this.api_key = data().deepCopy(fields()[0].schema(), other.api_key);
        fieldSetFlags()[0] = true;
      }
      if (isValidValue(fields()[1], other.chat_id)) {
        this.chat_id = data().deepCopy(fields()[1].schema(), other.chat_id);
        fieldSetFlags()[1] = true;
      }
      if (isValidValue(fields()[2], other.participant_uuids)) {
        this.participant_uuids = data().deepCopy(fields()[2].schema(), other.participant_uuids);
        fieldSetFlags()[2] = true;
      }
    }

    /**
      * Gets the value of the 'api_key' field.
      * @return The value.
      */
    public java.lang.String getApiKey() {
      return api_key;
    }


    /**
      * Sets the value of the 'api_key' field.
      * @param value The value of 'api_key'.
      * @return This builder.
      */
    public br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder setApiKey(java.lang.String value) {
      validate(fields()[0], value);
      this.api_key = value;
      fieldSetFlags()[0] = true;
      return this;
    }

    /**
      * Checks whether the 'api_key' field has been set.
      * @return True if the 'api_key' field has been set, false otherwise.
      */
    public boolean hasApiKey() {
      return fieldSetFlags()[0];
    }


    /**
      * Clears the value of the 'api_key' field.
      * @return This builder.
      */
    public br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder clearApiKey() {
      api_key = null;
      fieldSetFlags()[0] = false;
      return this;
    }

    /**
      * Gets the value of the 'chat_id' field.
      * @return The value.
      */
    public java.lang.String getChatId() {
      return chat_id;
    }


    /**
      * Sets the value of the 'chat_id' field.
      * @param value The value of 'chat_id'.
      * @return This builder.
      */
    public br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder setChatId(java.lang.String value) {
      validate(fields()[1], value);
      this.chat_id = value;
      fieldSetFlags()[1] = true;
      return this;
    }

    /**
      * Checks whether the 'chat_id' field has been set.
      * @return True if the 'chat_id' field has been set, false otherwise.
      */
    public boolean hasChatId() {
      return fieldSetFlags()[1];
    }


    /**
      * Clears the value of the 'chat_id' field.
      * @return This builder.
      */
    public br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder clearChatId() {
      chat_id = null;
      fieldSetFlags()[1] = false;
      return this;
    }

    /**
      * Gets the value of the 'participant_uuids' field.
      * @return The value.
      */
    public java.util.List<java.lang.String> getParticipantUuids() {
      return participant_uuids;
    }


    /**
      * Sets the value of the 'participant_uuids' field.
      * @param value The value of 'participant_uuids'.
      * @return This builder.
      */
    public br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder setParticipantUuids(java.util.List<java.lang.String> value) {
      validate(fields()[2], value);
      this.participant_uuids = value;
      fieldSetFlags()[2] = true;
      return this;
    }

    /**
      * Checks whether the 'participant_uuids' field has been set.
      * @return True if the 'participant_uuids' field has been set, false otherwise.
      */
    public boolean hasParticipantUuids() {
      return fieldSetFlags()[2];
    }


    /**
      * Clears the value of the 'participant_uuids' field.
      * @return This builder.
      */
    public br.com.maidahealth.telemedapi.avro.AddParticipantRequest.Builder clearParticipantUuids() {
      participant_uuids = null;
      fieldSetFlags()[2] = false;
      return this;
    }

    @Override
    @SuppressWarnings("unchecked")
    public AddParticipantRequest build() {
      try {
        AddParticipantRequest record = new AddParticipantRequest();
        record.api_key = fieldSetFlags()[0] ? this.api_key : (java.lang.String) defaultValue(fields()[0]);
        record.chat_id = fieldSetFlags()[1] ? this.chat_id : (java.lang.String) defaultValue(fields()[1]);
        record.participant_uuids = fieldSetFlags()[2] ? this.participant_uuids : (java.util.List<java.lang.String>) defaultValue(fields()[2]);
        return record;
      } catch (org.apache.avro.AvroMissingFieldException e) {
        throw e;
      } catch (java.lang.Exception e) {
        throw new org.apache.avro.AvroRuntimeException(e);
      }
    }
  }

  @SuppressWarnings("unchecked")
  private static final org.apache.avro.io.DatumWriter<AddParticipantRequest>
    WRITER$ = (org.apache.avro.io.DatumWriter<AddParticipantRequest>)MODEL$.createDatumWriter(SCHEMA$);

  @Override public void writeExternal(java.io.ObjectOutput out)
    throws java.io.IOException {
    WRITER$.write(this, SpecificData.getEncoder(out));
  }

  @SuppressWarnings("unchecked")
  private static final org.apache.avro.io.DatumReader<AddParticipantRequest>
    READER$ = (org.apache.avro.io.DatumReader<AddParticipantRequest>)MODEL$.createDatumReader(SCHEMA$);

  @Override public void readExternal(java.io.ObjectInput in)
    throws java.io.IOException {
    READER$.read(this, SpecificData.getDecoder(in));
  }

  @Override protected boolean hasCustomCoders() { return true; }

  @Override public void customEncode(org.apache.avro.io.Encoder out)
    throws java.io.IOException
  {
    out.writeString(this.api_key);

    out.writeString(this.chat_id);

    long size0 = this.participant_uuids.size();
    out.writeArrayStart();
    out.setItemCount(size0);
    long actualSize0 = 0;
    for (java.lang.String e0: this.participant_uuids) {
      actualSize0++;
      out.startItem();
      out.writeString(e0);
    }
    out.writeArrayEnd();
    if (actualSize0 != size0)
      throw new java.util.ConcurrentModificationException("Array-size written was " + size0 + ", but element count was " + actualSize0 + ".");

  }

  @Override public void customDecode(org.apache.avro.io.ResolvingDecoder in)
    throws java.io.IOException
  {
    org.apache.avro.Schema.Field[] fieldOrder = in.readFieldOrderIfDiff();
    if (fieldOrder == null) {
      this.api_key = in.readString();

      this.chat_id = in.readString();

      long size0 = in.readArrayStart();
      java.util.List<java.lang.String> a0 = this.participant_uuids;
      if (a0 == null) {
        a0 = new SpecificData.Array<java.lang.String>((int)size0, SCHEMA$.getField("participant_uuids").schema());
        this.participant_uuids = a0;
      } else a0.clear();
      SpecificData.Array<java.lang.String> ga0 = (a0 instanceof SpecificData.Array ? (SpecificData.Array<java.lang.String>)a0 : null);
      for ( ; 0 < size0; size0 = in.arrayNext()) {
        for ( ; size0 != 0; size0--) {
          java.lang.String e0 = (ga0 != null ? ga0.peek() : null);
          e0 = in.readString();
          a0.add(e0);
        }
      }

    } else {
      for (int i = 0; i < 3; i++) {
        switch (fieldOrder[i].pos()) {
        case 0:
          this.api_key = in.readString();
          break;

        case 1:
          this.chat_id = in.readString();
          break;

        case 2:
          long size0 = in.readArrayStart();
          java.util.List<java.lang.String> a0 = this.participant_uuids;
          if (a0 == null) {
            a0 = new SpecificData.Array<java.lang.String>((int)size0, SCHEMA$.getField("participant_uuids").schema());
            this.participant_uuids = a0;
          } else a0.clear();
          SpecificData.Array<java.lang.String> ga0 = (a0 instanceof SpecificData.Array ? (SpecificData.Array<java.lang.String>)a0 : null);
          for ( ; 0 < size0; size0 = in.arrayNext()) {
            for ( ; size0 != 0; size0--) {
              java.lang.String e0 = (ga0 != null ? ga0.peek() : null);
              e0 = in.readString();
              a0.add(e0);
            }
          }
          break;

        default:
          throw new java.io.IOException("Corrupt ResolvingDecoder.");
        }
      }
    }
  }
}











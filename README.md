# PROJECT BigPipe

## OUTLINE:

##### __GOAL__
To create a cluster based single node script; wherein the following occurs:
 1. Script waits on listening port for TCP command.
 2. Once command is received, instruction is evaluated based on complexity.
 3. Instruction is then distributed from Master to slaves (machines/servers) on pre-determined TCP port unlesss.
 4. Slaves enter ready state and return ready command.
 5. Ready for instructions and load the Master then sends password for salt to Slaves.
 6. Slaves cache password and return new ready state and OK open for instruction.
 7. Master cuts input into pieces based on available and idle nodes. (complexity is based upon byte block size)
 8. Input is threaded and encrypted with password distributed earlier per each Slave.
 9. Threads shift from encryption phase to distribution phase.
 10. Each thread is then connected via TCP to each available Slave.
  * Remaining Slaves are sent instructions in additional rounds based on available threads from Master.
 11. Each TCP connection creates a UDP connection as well on a randomly generated port.
 12. Each Slave returns UDP port to Master.
 13. Master begins distributing chunks encrypted with pre-determined password(s) and instructions to all Slaves required for operation.
 14. Slaves decrypt chunk and begin instructions sent with chunk.
 15. Upon completion the following occurs:
  1. Raw Answer is sent with designated thread number and Slave node ID to Master.
  2. Master places answer in segmented line waiting for all parts.
  3. Slave clears cache and any temporary data.
  4. Slave returns to ready state.
  5. If Master is not able to receive Chunk, Chunk is considered missing and we begin the process again from **4. in main process.**
 16. Master reassembles Chunks in order by:
  1. Chunks are decrypted.
  2. Chunks are arranged in order by ID, thread, instruction.
  3. ID is stripped from Chunk.
  4. Thread is maintained in cache memory on Master until final instruction is completed.
  5. Once instruction is completed, cache is emptied and reassembled block is placed in stack with new ID.
    1. Stack ID's are laid in temporary file much like warehouse procedure;
    2. Warehouse is locked as special file type with session key.
  6. Once all instructions and storage is completed:
    1. Warehouse file is unlocked with stored session key.
      * Session key is dissolved.
    2. Warehouse data is copied to server.
    3. Warehouse copy is delivered to client while original is maintained by server for length of time since epoc + (7 days * (per request of file))

#### __EXAMPLE__

Jane sends a file to the Master server to be compressed.

  1. The file is received by the server.
    * At this point the Master has 2 nodes with 4 cores each and some ram.
  2. Work continues as normal despite the size of the file.
    * The estimated time for file compression delivery is approximately (Cores * median speed) * Block Chunk size.
    * OR: (File Size / ((Cores * median speed) * 2)) / 32

At the same time bob introduces two new nodes for the Master.
  * These nodes each have 4 cores a piece.
    * So a total of 8 new cores.

Though the server has begun spreading file chunks by now notices the new nodes in it's time interval checking procedure.
  * These new nodes are added.
  * additional chunks are distributed after evaluation of new nodes.
  * Estimation time decreases.

Jane receives her newly compressed file and it becomes publicly available for the entirety of the Master server so long as Jane sends the request URL to another client.

Alice requests the file from the Master after given the URL from Jane.
  * The Master sends a copy of the original
  * Now that more than one request has been made the Master distributes pieces of the requested file to the nodes.
    * This is sharding.
    * Each node takes an unassembled piece of the file with an instruction and ID attached and is told to STORE data.

Roger also makes a request for this file;
  * The nodes begin sending their shards as a Peer-to-Peer connection and the master reassembles any missing elements.

##### __RESPONSIVENESS__
To properly display project maintenance and usage a web-based dashboard will be used during development and possibly during final release.
